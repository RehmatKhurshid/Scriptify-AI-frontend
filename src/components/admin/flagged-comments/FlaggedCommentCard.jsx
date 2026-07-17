import React from 'react';
import { ExternalLink, Trash2, EyeOff, CheckCircle } from 'lucide-react';
import styles from '../../../styles/admin/flagged-comments/FlaggedCommentCard.module.css';

const FlaggedCommentCard = ({ comment, onDelete, onHide, onApprove }) => {
    const { user, postTitle, postLink, reportedTime, content, analysis } = comment;

    return (
        <div className={styles.card}>
            <div className={styles.cardLeft}>
                <div className={styles.userHeader}>
                    <div className={styles.userAvatar}>
                        <img src={user.avatar} alt={user.name} />
                    </div>
                    <div className={styles.userInfo}>
                        <div className={styles.nameRow}>
                            <span className={styles.userName}>{user.name}</span>
                            {user.priorFlags > 0 && (
                                <span className={styles.priorFlags}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    </svg>
                                    {user.priorFlags} Prior Flags
                                </span>
                            )}
                        </div>
                        <span className={styles.userId}>{user.id}</span>
                    </div>
                </div>

                <div className={styles.metaInfo}>
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Reported:</span>
                        <span className={styles.metaValue}>{reportedTime}</span>
                    </div>
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Status:</span>
                        <span className={styles.metaValue}>{comment.status}</span>
                    </div>
                </div>
            </div>

            <div className={styles.cardCenter}>
                <div className={styles.postedIn}>
                    <span className={styles.postedLabel}>POSTED IN:</span>
                    <a href={postLink} className={styles.postLink}>
                        {postTitle}
                        <ExternalLink size={14} />
                    </a>
                </div>

                <div className={styles.commentBox}>
                    <p className={styles.commentText}>{content}</p>
                </div>

                <div className={styles.analysisTags}>
                    <div className={`${styles.tag} ${styles.toxicityTag}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <div className={styles.tagContent}>
                            <span className={styles.tagLabel}>Toxicity: {analysis.toxicity.value}</span>
                            <span className={styles.tagSub} style={{ color: analysis.toxicity.color }}>
                                ({analysis.toxicity.severity})
                            </span>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1="9" y1="9" x2="9.01" y2="9" />
                            <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <div className={styles.tagContent}>
                            <span className={styles.tagLabel}>Sentiment:</span>
                            <span className={styles.tagValue}>{analysis.sentiment.value}</span>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <div className={styles.tagContent}>
                            <span className={styles.tagLabel}>Policy:</span>
                            <span className={styles.tagValue}>{analysis.policy.value}</span>
                        </div>
                    </div>

                    <div className={styles.tag}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <div className={styles.tagContent}>
                            <span className={styles.tagLabel}>AI Confidence:</span>
                            <span className={styles.tagValue}>{analysis.aiConfidence.value}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.cardRight}>
                <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={onDelete}>
                    <Trash2 size={16} />
                    <span>Delete</span>
                </button>

                <button className={`${styles.actionBtn} ${styles.hideBtn}`} onClick={onHide}>
                    <EyeOff size={16} />
                    <span>Hide</span>
                </button>

                <button className={`${styles.actionBtn} ${styles.approveBtn}`} onClick={onApprove}>
                    <CheckCircle size={16} />
                    <span>Approve</span>
                </button>
            </div>
        </div>
    );
};

export default FlaggedCommentCard;