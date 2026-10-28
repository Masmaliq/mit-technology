"use client";

import {AddIcon, DocumentIcon, EditIcon, TrashIcon} from "@sanity/icons";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  definePlugin,
  useClient,
  useDocumentOperation,
  useDocumentOperationEvent,
} from "sanity";
import {StudioBackLink} from "./components/StudioEditorPrimitives";
import styles from "./caseStudiesTool.module.css";

type CaseStudyDocument = {
  _id: string;
  client?: string;
  industry?: string;
  slug?: string;
  title?: string;
  updatedAt?: string;
  year?: number | string;
};

type CaseStudyListItem = Omit<CaseStudyDocument, "_id"> & {
  _id: string;
  hasDraft: boolean;
  hasPublished: boolean;
  status: "DRAFT" | "PUBLISHED" | "CHANGES";
};

const apiVersion = "2026-01-01";

function documentHref(documentId: string) {
  return `/studio/case-study-document/intent/edit/id=${encodeURIComponent(documentId)};type=caseStudy`;
}

function CaseStudyRow({
  index,
  item,
  onDeleted,
}: {
  index: number;
  item: CaseStudyListItem;
  onDeleted: () => void;
}) {
  const operations = useDocumentOperation(item._id, "caseStudy");
  const operationEvent = useDocumentOperationEvent(item._id, "caseStudy");
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const event = operationEvent;
    if (!deleting || !event || event.op !== "delete") return;

    if (event.type === "success") {
      setDeleting(false);
      setConfirming(false);
      onDeleted();
      return;
    }

    if (event.type === "error") {
      setDeleting(false);
      setDeleteError(event.error.message || "Case Study tidak dapat dihapus.");
    }
  }, [deleting, onDeleted, operationEvent]);

  const deleteDisabled = operations.delete.disabled !== false;
  const metadata = [item.client, item.industry, item.year].filter(Boolean).join(" · ");

  return <>
    <article className={styles.row}>
      <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
      <div className={styles.identity}>
        <strong>{item.title || "Untitled Case Study"}</strong>
        <small>{metadata || "Case Study"}</small>
      </div>
      <div className={styles.detail}><span>Client</span><strong>{item.client || "—"}</strong></div>
      <div className={styles.detail}><span>Category</span><strong>{item.industry || "—"}</strong></div>
      <div className={styles.detail}><span>Year</span><strong>{item.year || "—"}</strong></div>
      <div className={styles.detail}><span>Slug</span><strong>{item.slug || "—"}</strong></div>
      <span className={`${styles.status} ${styles[`status${item.status}`]}`}>{item.status}</span>
      <div className={styles.actions}>
        <a className={styles.iconButton} href={documentHref(item._id)} aria-label={`Edit ${item.title || "Case Study"}`} title="Edit Case Study">
          <EditIcon />
        </a>
        <button className={`${styles.iconButton} ${styles.deleteButton}`} type="button" onClick={() => setConfirming(true)} aria-label={`Hapus ${item.title || "Case Study"}`} title="Hapus Case Study">
          <TrashIcon />
        </button>
      </div>
    </article>

    {confirming ? <div className={styles.dialogBackdrop} role="presentation" onMouseDown={(event) => {
      if (event.currentTarget === event.target && !deleting) setConfirming(false);
    }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby={`delete-${item._id}`}>
        <span className={styles.dialogIcon}><TrashIcon /></span>
        <p>Hapus Case Study</p>
        <h2 id={`delete-${item._id}`}>{item.title || "Untitled Case Study"}</h2>
        <span>Draft dan versi published untuk Case Study ini akan dihapus. Tindakan ini tidak dapat dibatalkan.</span>
        {deleteError ? <div className={styles.dialogError}>{deleteError}</div> : null}
        {deleteDisabled ? <div className={styles.dialogError}>{String(operations.delete.disabled)}</div> : null}
        <div className={styles.dialogActions}>
          <button type="button" onClick={() => setConfirming(false)} disabled={deleting}>Batal</button>
          <button type="button" className={styles.confirmDelete} disabled={deleting || deleteDisabled} onClick={() => {
            setDeleteError(null);
            setDeleting(true);
            operations.delete.execute();
          }}>{deleting ? "Menghapus…" : "Hapus Case Study"}</button>
        </div>
      </section>
    </div> : null}
  </>;
}

function CaseStudiesList() {
  const client = useClient({apiVersion});
  const rawClient = useMemo(() => client.withConfig({perspective: "raw"}), [client]);
  const [items, setItems] = useState<CaseStudyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const newDocumentId = useMemo(() => `caseStudy-${crypto.randomUUID()}`, []);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const query = `*[_type == "caseStudy"] | order(_updatedAt desc){
        _id,
        title,
        client,
        industry,
        year,
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`;
      const documents = await rawClient.fetch<CaseStudyDocument[]>(query);
      const canonical = new Map<string, CaseStudyListItem>();

      documents.forEach((document) => {
        const isDraft = document._id.startsWith("drafts.");
        const id = document._id.replace(/^drafts\./, "");
        const existing = canonical.get(id);
        const hasDraft = Boolean(existing?.hasDraft || isDraft);
        const hasPublished = Boolean(existing?.hasPublished || !isDraft);
        const preferred = isDraft || !existing ? document : existing;

        canonical.set(id, {
          ...preferred,
          _id: id,
          hasDraft,
          hasPublished,
          status: hasDraft && hasPublished ? "CHANGES" : hasDraft ? "DRAFT" : "PUBLISHED",
        });
      });

      setItems(Array.from(canonical.values()).sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")));
    } catch {
      setError("Case Studies tidak dapat dimuat. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [rawClient]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  return <main className={styles.page} data-mit-case-studies-list="true">
    <div className={styles.inner}>
      <StudioBackLink href="/studio/dashboard/pages">Back to Pages</StudioBackLink>

      <header className={styles.header}>
        <div>
          <p>Pages / Work</p>
          <h1>Case Studies</h1>
          <span>Kelola seluruh Case Study yang tampil pada website Emitech.</span>
        </div>
        <a className={styles.newButton} href={documentHref(newDocumentId)}><AddIcon /> Tambah Case Study</a>
      </header>

      <div className={styles.listHeader}>
        <span>Case Study Collection</span>
        <span>{items.length} {items.length === 1 ? "document" : "documents"}</span>
      </div>

      <section className={styles.list} aria-label="Case Studies">
        {loading ? <div className={styles.state}>Memuat Case Studies…</div> : null}
        {error ? <div className={styles.state}>{error}</div> : null}
        {!loading && !error && items.length === 0 ? <div className={styles.state}>Belum ada Case Study.</div> : null}
        {!loading && !error ? items.map((item, index) => <CaseStudyRow item={item} index={index} key={item._id} onDeleted={loadItems} />) : null}
      </section>
    </div>
  </main>;
}

export const caseStudiesTool = definePlugin({
  name: "mit-case-studies-tool",
  tools: [{name: "case-studies-editor", title: "Case Studies", icon: DocumentIcon, component: CaseStudiesList}],
});
