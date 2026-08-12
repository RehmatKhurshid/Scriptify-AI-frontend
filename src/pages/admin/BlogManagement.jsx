import React, { useCallback, useEffect, useState } from 'react';
import BlogSidebar from '../../components/admin/blog-management/BlogSidebar';
import BlogTopNavbar from '../../components/admin/blog-management/BlogTopNavbar';
import BlogManagementHeader from '../../components/admin/blog-management/BlogManagementHeader';
import BlogFilterBar from '../../components/admin/blog-management/BlogFilterBar';
import BlogBulkActions from '../../components/admin/blog-management/BlogBulkActions';
import BlogTable from '../../components/admin/blog-management/BlogTable';
import BlogPagination from '../../components/admin/blog-management/BlogPagination';
import adminService from '../../services/adminService';
import styles from '../../styles/admin/blog-management/BlogManagement.module.css';

export default function BlogManagement() {
  const [b, setB] = useState([]);
  const [sel, setSel] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [featured, setFeatured] = useState('All Posts');
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const d = await adminService.getBlogs({
        page,
        limit: 10,
        search: search.trim(),
        category,
        status,
        featured,
      });

      setB(
        (d.blogs || []).map((x) => ({
          ...x,
          id: x._id,
          title: x.title,
          thumbnail: x.thumbnailUrl,
          author: x.author ? `${x.author.firstName || ''} ${x.author.lastName || ''}`.trim() || x.author.email : 'Unknown',
          authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${x.author?._id || x._id}`,
          category: x.category || 'General',
          views: x.views || 0,
          likes: x.likes?.length || 0,
          status: x.status === 'published' ? 'Published' : 'Draft',
          published: x.createdAt ? new Date(x.createdAt).toLocaleDateString() : '-',
          featured: !!x.isFeatured,
        }))
      );
      setMeta({ total: d.total || 0, totalPages: d.totalPages || 1, limit: d.limit || 10 });
    } catch (e) {
      setError(e.message || 'Unable to load blogs.');
    } finally {
      setLoading(false);
    }
  }, [page, search, category, status, featured]);

  useEffect(() => {
    load();
  }, [load]);

  const feature = async (x) => {
    try {
      await adminService.toggleFeaturedBlog(x.id);
      await load();
    } catch (e) {
      setError(e.message || 'Unable to update blog.');
    }
  };

  const del = async (x) => {
    if (!window.confirm(`Delete "${x.title}"? This cannot be undone.`)) return;
    try {
      await adminService.deleteBlog(x.id);
      await load();
    } catch (e) {
      setError(e.message || 'Unable to delete blog.');
    }
  };

  const handleBulkFeature = async () => {
    if (!sel.length) return;
    try {
      await Promise.all(sel.map((id) => adminService.toggleFeaturedBlog(id)));
      setSel([]);
      await load();
    } catch (e) {
      setError(e.message || 'Bulk feature operation failed.');
    }
  };

  const handleBulkDelete = async () => {
    if (!sel.length) return;
    if (!window.confirm(`Delete ${sel.length} selected blogs? This cannot be undone.`)) return;
    try {
      await Promise.all(sel.map((id) => adminService.deleteBlog(id)));
      setSel([]);
      await load();
    } catch (e) {
      setError(e.message || 'Bulk delete operation failed.');
    }
  };

  const toggle = (id) => setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const all = () => setSel(sel.length === b.length ? [] : b.map((x) => x.id));

  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Users', icon: 'group' },
    { id: 'blogs', label: 'Blogs', icon: 'article', active: true },
    { id: 'flagged', label: 'Flagged Comments', icon: 'report' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className={styles.managementPage}>
      <BlogSidebar navItems={nav} />
      <div className={styles.mainArea}>
        <BlogTopNavbar
          searchQuery={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
        />
        <div className={styles.contentArea}>
          <BlogManagementHeader />
          <BlogFilterBar
            category={category}
            status={status}
            featured={featured}
            onCategoryChange={(val) => {
              setCategory(val);
              setPage(1);
            }}
            onStatusChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            onFeaturedChange={(val) => {
              setFeatured(val);
              setPage(1);
            }}
          />
          {error && <div style={{ color: '#f87171', padding: 12 }}>{error}</div>}
          <BlogBulkActions
            selectedCount={sel.length}
            onMarkFeatured={handleBulkFeature}
            onDeleteSelected={handleBulkDelete}
          />
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center' }}>Loading blogs...</div>
          ) : (
            <BlogTable
              blogs={b}
              selectedRows={sel}
              onToggleRow={toggle}
              onToggleAll={all}
              onToggleFeatured={feature}
              onDelete={del}
            />
          )}
          <BlogPagination
            currentPage={page}
            totalPages={meta.totalPages}
            totalItems={meta.total}
            itemsPerPage={meta.limit}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}