import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import styles from '../../../styles/admin/user-management/UserFilterBar.module.css';

const UserFilterBar = ({
    search = '',
    role = '',
    status = '',
    verified = '',
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onVerifiedChange,
    onResetFilters,
}) => {
    return (
        <div className={styles.filterBar}>
            <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    placeholder="Search by name or email..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filters}>
                {/* Role Filter */}
                <div className={styles.selectWrapper}>
                    <select
                        value={role}
                        onChange={(e) => onRoleChange && onRoleChange(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Role: All</option>
                        <option value="admin">Role: Admin</option>
                        <option value="blogger">Role: Blogger</option>
                        <option value="reader">Role: Reader</option>
                    </select>
                    <ChevronDown size={14} className={styles.selectIcon} />
                </div>

                {/* Status Filter */}
                <div className={styles.selectWrapper}>
                    <select
                        value={status}
                        onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
                        className={styles.filterSelect}
                    >
                        <option value="">Status: All</option>
                        <option value="active">Status: Active</option>
                        <option value="suspended">Status: Suspended</option>
                    </select>
                    <ChevronDown size={14} className={styles.selectIcon} />
                </div>
            </div>
        </div>
    );
};

export default UserFilterBar;