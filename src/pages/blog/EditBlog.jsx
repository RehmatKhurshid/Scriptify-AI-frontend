import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, X, CheckCircle, AlertTriangle, Info, Monitor, Tablet, Smartphone, FileText, ChevronRight } from 'lucide-react';
import EditorSidebar from '../../components/editor/EditorSidebar';
import EditBlogNavbar from '../../components/editor/EditBlogNavbar';
import EditBlogCanvas from '../../components/editor/EditBlogCanvas';
import EditPostSettingsPanel from '../../components/editor/EditPostSettingsPanel';
import styles from '../../styles/editor/EditBlog.module.css';

// Pre-existing mock databases
const MOCK_BLOGS = {
    '1': {
        id: 1,
        title: 'Cognitive Load and the Disappearing Interface',
        excerpt: 'Why the best user interfaces of 2025 are the ones you barely notice, and how predictive agents are replacing explicit commands.',
        category: 'Artificial Intelligence',
        tags: 'AI, UX, Human-Computer Interaction, Futures',
        content: `In the early days of personal computing, the user interface was a literal desktop. We dragged digital files into digital trash cans, mimicking the physical world to ease our transition into the digital. We called this skeuomorphism.

Today, we are witnessing the final stages of a different transition: the shift from explicit commands to implicit intent. 

As predictive systems and autonomous agents become more integrated into our daily workflows, the traditional "interface" is beginning to disappear entirely. Instead of clicking menus and typing queries, users interact with systems that anticipate their needs based on context, history, and cognitive state.

### The Rise of Anticipatory Systems

An anticipatory system is one that uses data streams to predict future requirements. In design terms, this means the software adapts itself to the user rather than forcing the user to adapt to the software. 

For instance, a writing editor might automatically summarize notes, clean up formatting, or suggest links to related research before the writer even prompts it to do so. The interface becomes fluid, expanding when guidance is needed and receding when the user is in a state of high focus.

### Measuring Cognitive Load

Cognitive load refers to the amount of mental effort being used in the working memory. When interfaces are busy, cluttered, or require constant decision-making (e.g., choosing font styles, organizing tag folders, managing layouts), the cognitive load spikes. By delegating structural and organizational tasks to AI, users can conserve their mental energy for high-level creative direction.

The goal of the modern designer is not to make interfaces beautiful, but to make them cognitive-load neutral.`,
        status: 'Published',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
        author: 'Julian Hayes',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        readTime: '5 min read'
    },
    '2': {
        id: 2,
        title: 'The Poetry of Latent Space',
        excerpt: 'Navigating the high-dimensional geometry where language models store concepts, and why it resembles human intuition more than cold logic.',
        category: 'Machine Learning',
        tags: 'Machine Learning, LLMs, Mathematics, Philosophy',
        content: `Latent space is a mathematical abstraction. It is a high-dimensional universe where concepts are represented as coordinates, and relationships between concepts are represented as distances.

When a language model learns, it builds this space. It plots "apple" near "pear" but far from "submarines". What is fascinating is that abstract concepts also find their relative positions: "justice" and "fairness" cluster together, while "chaos" sits on a distant ridge.

### Navigating the Geometry of Meaning

To navigate latent space is to explore the landscape of human thought. When we prompt a model to write a poem about artificial intelligence in the style of Emily Dickinson, we are drawing a vector between disparate coordinate systems. 

The resulting text is the intersection of these vectors. It is a bridge between the mathematical distribution of text tokens and the emotional resonances we associate with poetic form.

### Intuition vs. Logic

We often think of computers as purely logical engines. But latent space operates on a logic that feels closer to human intuition. It relies on associations, analogies, and semantic similarities. 

When you ask a model to find the "opposite" of a word, it does not consult a database. It moves in the negative vector direction across this landscape of concepts. The resulting answers can be surprisingly poetic, catching subtle shades of meaning that formal definitions miss.`,
        status: 'Draft',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
        author: 'Sarah Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        readTime: '12 min read'
    }
};

const DEFAULT_BLOG = {
    id: 99,
    title: 'Designing with Generative UI Systems',
    excerpt: 'Exploring how interface blocks can be rendered dynamically on the fly based on intent parsing and context.',
    category: 'Design',
    tags: 'GenerativeUI, UX, React, DesignSystems',
    content: `Generative UI is the next frontier of user experience. Instead of rendering static layouts composed of pre-built UI components, generative systems analyze the user's intent in real time and assemble customized widgets on the fly.

This approach challenges our traditional paradigms of UI development, shifting focus from fixed design screens to dynamic, fluid, semantic frameworks that adapt to unique user journeys.`,
    status: 'Draft',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
    author: 'Rehmat Khurshid',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    readTime: '3 min read'
};

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('drafts');

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        { id: 'drafts', label: 'Drafts', icon: 'FileText' },
        { id: 'workshop', label: 'AI Workshop', icon: 'Sparkles' },
        { id: 'assets', label: 'Assets', icon: 'FolderOpen' },
        { id: 'settings', label: 'Settings', icon: 'Settings' },
    ];

    // Core States
    const [blogData, setBlogData] = useState({ ...DEFAULT_BLOG });
    const [initialBlogData, setInitialBlogData] = useState({ ...DEFAULT_BLOG });
    const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'idle'
    const [isDirty, setIsDirty] = useState(false);
    const [hasSessionEdits, setHasSessionEdits] = useState(false);
    
    // AI and Loadings States
    const [loadingFields, setLoadingFields] = useState({
        title: false,
        excerpt: false,
        tags: false,
        thumbnail: false,
        content: false
    });
    const [draftPrompt, setDraftPrompt] = useState('');

    // Modals
    const [activeModal, setActiveModal] = useState(null); // 'preview', 'unsaved-warning', 'replace-confirm', 'title-select'
    const [pendingAction, setPendingAction] = useState(null);
    const [aiTitles, setAiTitles] = useState([]);
    const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'

    // Toasts
    const [toasts, setToasts] = useState([]);

    // Pre-fill Blog details on Mount / ID change
    useEffect(() => {
        const loadedBlog = MOCK_BLOGS[id] || DEFAULT_BLOG;
        setBlogData({ ...loadedBlog });
        setInitialBlogData({ ...loadedBlog });
        setSaveStatus('saved');
        setIsDirty(false);
        setHasSessionEdits(false);
        addToast('info', 'Blog Loaded', `Loaded existing blog post "${loadedBlog.title}" successfully.`);
    }, [id]);

    // Handle Manual Changes & Save State dirty calculations
    const handleBlogDataChange = (newData) => {
        setBlogData(newData);
        setSaveStatus('idle');
        setIsDirty(true);
        setHasSessionEdits(true);
    };

    // Simulated Auto-Save Indicator check every 30 seconds
    useEffect(() => {
        const autoSaveTimer = setInterval(() => {
            if (isDirty) {
                setSaveStatus('saving');
                setTimeout(() => {
                    setInitialBlogData({ ...blogData });
                    setIsDirty(false);
                    setSaveStatus('saved');
                }, 1200);
            }
        }, 30000);

        return () => clearInterval(autoSaveTimer);
    }, [isDirty, blogData]);

    // Toast Notice helper
    const addToast = (type, title, message) => {
        const toastId = Date.now();
        setToasts(prev => [...prev, { id: toastId, type, title, message }]);
        setTimeout(() => {
            removeToast(toastId);
        }, 5000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Safeguards & Confirmations
    const showConfirmModal = (actionDescription, callback) => {
        setPendingAction(() => () => {
            callback();
            setActiveModal(null);
            setPendingAction(null);
        });
        setActiveModal('replace-confirm');
    };

    // Actions implementation
    const saveChanges = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setInitialBlogData({ ...blogData });
            setIsDirty(false);
            setHasSessionEdits(false);
            setSaveStatus('saved');
            addToast('success', 'Changes Saved', 'All modifications have been successfully saved.');
        }, 1000);
    };

    const saveAsDraft = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            const updated = { ...blogData, status: 'Draft' };
            setBlogData(updated);
            setInitialBlogData(updated);
            setIsDirty(false);
            setHasSessionEdits(false);
            setSaveStatus('saved');
            addToast('success', 'Saved as Draft', 'Blog status updated to Draft and saved.');
        }, 1000);
    };

    const publishUpdates = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            const updated = { ...blogData, status: 'Published' };
            setBlogData(updated);
            setInitialBlogData(updated);
            setIsDirty(false);
            setHasSessionEdits(false);
            setSaveStatus('saved');
            addToast('success', 'Published Updates', 'Your blog updates are live! Published successfully.');
        }, 1000);
    };

    const handleCancel = () => {
        if (hasSessionEdits) {
            setActiveModal('unsaved-warning');
        } else {
            navigate('/Home-Feed');
        }
    };

    const confirmLeave = () => {
        setIsDirty(false);
        setHasSessionEdits(false);
        setActiveModal(null);
        navigate('/Home-Feed');
    };

    // AI Helper Operations
    const handleAIGenerateTitle = () => {
        setLoadingFields(prev => ({ ...prev, title: true }));
        addToast('info', 'AI Assistant', 'Analyzing content to generate matching titles...');
        
        setTimeout(() => {
            const generated = [
                `Designing the Invisible: UX in the Era of Predictive AI`,
                `Beyond Clicking: Why the Best Interface is No Interface`,
                `The Cognitive Load Trap: Minimizing Friction in Product Design`,
                `Implicit Intent: The Evolution of Intelligent UX Systems`
            ];
            setAiTitles(generated);
            setLoadingFields(prev => ({ ...prev, title: false }));
            setActiveModal('title-select');
        }, 2000);
    };

    const selectTitle = (newTitle) => {
        const updateTitle = () => {
            setBlogData(prev => ({ ...prev, title: newTitle }));
            setSaveStatus('idle');
            setIsDirty(true);
            setHasSessionEdits(true);
            addToast('success', 'Title Updated', 'AI-generated title applied successfully.');
        };

        if (blogData.title && blogData.title !== initialBlogData.title) {
            showConfirmModal('Replace your custom title with the chosen AI title?', updateTitle);
        } else {
            updateTitle();
            setActiveModal(null);
        }
    };

    const handleAISummarizeExcerpt = () => {
        setLoadingFields(prev => ({ ...prev, excerpt: true }));
        addToast('info', 'AI Assistant', 'Reading article paragraphs to synthesize summary...');

        setTimeout(() => {
            const summary = `As predictive agents reduce structural layout complexities, modern user interface designs are transitioning from explicit actions to implicit anticipations, successfully reducing user cognitive loads.`;
            
            const applySummary = () => {
                setBlogData(prev => ({ ...prev, excerpt: summary }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                setLoadingFields(prev => ({ ...prev, excerpt: false }));
                addToast('success', 'Summary Created', 'Excerpt replaced with an AI-condensed summary.');
            };

            if (blogData.excerpt && blogData.excerpt.trim()) {
                showConfirmModal('Replace your existing excerpt with the AI summary?', () => {
                    applySummary();
                });
                setLoadingFields(prev => ({ ...prev, excerpt: false }));
            } else {
                applySummary();
            }
        }, 2000);
    };

    const handleAIGenerateTags = () => {
        setLoadingFields(prev => ({ ...prev, tags: true }));
        addToast('info', 'AI Assistant', 'Extracting metadata key terms...');

        setTimeout(() => {
            const tags = `GenerativeUI, UXDesign, CognitiveLoad, PredictiveAgents, DesignSystems`;
            
            const applyTags = () => {
                setBlogData(prev => ({ ...prev, tags }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                setLoadingFields(prev => ({ ...prev, tags: false }));
                addToast('success', 'SEO Tags Updated', 'AI-generated search tags inserted.');
            };

            if (blogData.tags && blogData.tags.trim()) {
                showConfirmModal('Overwrite current tags with AI SEO tags?', () => {
                    applyTags();
                });
                setLoadingFields(prev => ({ ...prev, tags: false }));
            } else {
                applyTags();
            }
        }, 1800);
    };

    const handleAIGenerateThumbnail = () => {
        setLoadingFields(prev => ({ ...prev, thumbnail: true }));
        addToast('info', 'AI Illustrator', 'Synthesizing artwork for category ' + blogData.category + '...');

        setTimeout(() => {
            const imageUrls = [
                'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
                'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=630&fit=crop',
                'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&h=630&fit=crop'
            ];
            const chosen = imageUrls[Math.floor(Math.random() * imageUrls.length)];

            setBlogData(prev => ({ ...prev, image: chosen }));
            setSaveStatus('idle');
            setIsDirty(true);
            setHasSessionEdits(true);
            setLoadingFields(prev => ({ ...prev, thumbnail: false }));
            addToast('success', 'Art Generated', 'AI thumbnail generated successfully.');
        }, 2500);
    };

    // Editor Content AI buttons
    const handleAIImproveContent = () => {
        setLoadingFields(prev => ({ ...prev, content: true }));
        addToast('info', 'AI Assistant', 'Improving clarity, prose, and sentence structure...');

        setTimeout(() => {
            const improvedContent = blogData.content + '\n\n*(Self-Correction/Editor Note: These considerations require frontend and design engineering disciplines to construct adaptive component schemas that render based on server-driven JSON UI protocols, ensuring sub-100ms render bounds.)*';
            
            showConfirmModal('Append AI improvements to your blog text?', () => {
                setBlogData(prev => ({ ...prev, content: improvedContent }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                addToast('success', 'Content Improved', 'AI improved layout logic added.');
            });
            setLoadingFields(prev => ({ ...prev, content: false }));
        }, 2500);
    };

    const handleAIContinueWriting = () => {
        setLoadingFields(prev => ({ ...prev, content: true }));
        addToast('info', 'AI Assistant', 'Predicting next paragraphs based on current draft context...');

        setTimeout(() => {
            const continuation = `\n\nMoving forward, design teams will need to stop thinking about layouts in terms of pixels and start planning in terms of structural variables. The role of the designer shifts from illustrator to semantic logic writer, defining boundaries within which the layout engines build unique experiences.`;
            setBlogData(prev => ({ ...prev, content: prev.content + continuation }));
            setSaveStatus('idle');
            setIsDirty(true);
            setHasSessionEdits(true);
            setLoadingFields(prev => ({ ...prev, content: false }));
            addToast('success', 'Content Expanded', 'AI continued writing the draft.');
        }, 2000);
    };

    const handleAIRewriteSelected = (selectionData) => {
        setLoadingFields(prev => ({ ...prev, content: true }));
        
        if (selectionData) {
            addToast('info', 'AI Writer', `Rewriting highlighted text: "${selectionData.text.substring(0, 15)}..."`);
            setTimeout(() => {
                const rewritten = `[AI Rewritten: ${selectionData.text.toUpperCase()}]`;
                const text = blogData.content;
                const newContent = text.substring(0, selectionData.start) + rewritten + text.substring(selectionData.end);
                
                setBlogData(prev => ({ ...prev, content: newContent }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                setLoadingFields(prev => ({ ...prev, content: false }));
                addToast('success', 'Selection Rewritten', 'The highlighted section was successfully optimized.');
            }, 1800);
        } else {
            addToast('info', 'AI Writer', 'Rewriting whole blog text...');
            setTimeout(() => {
                const rewrittenWhole = `### (AI Rewritten Draft Version)\n\n` + blogData.content;
                showConfirmModal('Replace whole content with rewritten draft?', () => {
                    setBlogData(prev => ({ ...prev, content: rewrittenWhole }));
                    setSaveStatus('idle');
                    setIsDirty(true);
                    setHasSessionEdits(true);
                    addToast('success', 'Blog Rewritten', 'Entire post updated by AI.');
                });
                setLoadingFields(prev => ({ ...prev, content: false }));
            }, 2000);
        }
    };

    const handleAIExpandContent = (selectionData) => {
        setLoadingFields(prev => ({ ...prev, content: true }));
        addToast('info', 'AI Writer', 'Adding definitions and supporting context...');

        setTimeout(() => {
            if (selectionData) {
                const expanded = `\n${selectionData.text}\n\n*Supporting Evidence:* Empirical studies in user attention span show that cognitive fatigue decreases by up to 34% when interfaces dynamically prune secondary action items, confirming that predictive assistance has measurable benefits on user experience.\n`;
                const text = blogData.content;
                const newContent = text.substring(0, selectionData.start) + expanded + text.substring(selectionData.end);
                
                setBlogData(prev => ({ ...prev, content: newContent }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                addToast('success', 'Selection Expanded', 'Added context details.');
            } else {
                setBlogData(prev => ({ ...prev, content: prev.content + '\n\n*Supporting Evidence:* Empirically, user attention bounds are optimized when layouts are contextualized.' }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                addToast('success', 'Content Expanded', 'Added extra details.');
            }
            setLoadingFields(prev => ({ ...prev, content: false }));
        }, 1800);
    };

    const handleAIShortenContent = (selectionData) => {
        setLoadingFields(prev => ({ ...prev, content: true }));
        addToast('info', 'AI Writer', 'Pruning wordy phrases for succinctness...');

        setTimeout(() => {
            if (selectionData) {
                const shortened = `[AI Shortened: ${selectionData.text.split(' ').slice(0, Math.ceil(selectionData.text.split(' ').length / 2)).join(' ')}...]`;
                const text = blogData.content;
                const newContent = text.substring(0, selectionData.start) + shortened + text.substring(selectionData.end);
                
                setBlogData(prev => ({ ...prev, content: newContent }));
                setSaveStatus('idle');
                setIsDirty(true);
                setHasSessionEdits(true);
                addToast('success', 'Selection Shortened', 'Pruned highlighted text.');
            } else {
                const shortenedWhole = blogData.content.substring(0, Math.floor(blogData.content.length / 2)) + '...';
                showConfirmModal('Replace current blog with shortened draft summary?', () => {
                    setBlogData(prev => ({ ...prev, content: shortenedWhole }));
                    setSaveStatus('idle');
                    setIsDirty(true);
                    setHasSessionEdits(true);
                    addToast('success', 'Content Shortened', 'Entire blog text condensed.');
                });
            }
            setLoadingFields(prev => ({ ...prev, content: false }));
        }, 1800);
    };

    // Sidebar generate draft
    const handleGenerateDraft = () => {
        if (!draftPrompt.trim()) return;

        const executeGeneration = () => {
            setLoadingFields(prev => ({ ...prev, content: true }));
            addToast('info', 'AI Assistant', `Drafting: "${draftPrompt.substring(0, 20)}..."`);
            
            setTimeout(() => {
                const newDraft = {
                    title: `Dynamic Insights on: ${draftPrompt}`,
                    excerpt: `An AI-generated analysis of ${draftPrompt} exploring design implications and technical barriers.`,
                    category: 'Artificial Intelligence',
                    tags: 'AI, Future, ' + draftPrompt.replace(/\s+/g, ''),
                    content: `# Dynamic Insights on: ${draftPrompt}\n\nThis article outlines the core mechanics of ${draftPrompt}. By applying intelligent feedback models, design workflows can achieve faster production cycles, shifting focus from raw assets to systematic integrations.\n\n### Core Pillars\n1. Systems-driven assembly.\n2. User focus tuning.\n3. Automation feedback loops.\n\nSummary: AI-driven drafts allow content creators to draft concepts rapidly.`,
                    status: 'Draft',
                    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&h=630&fit=crop',
                    author: 'Rehmat Khurshid',
                    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                    readTime: '2 min read'
                };
                setBlogData(newDraft);
                setInitialBlogData(newDraft);
                setIsDirty(false);
                setHasSessionEdits(true);
                setSaveStatus('saved');
                setDraftPrompt('');
                setLoadingFields(prev => ({ ...prev, content: false }));
                addToast('success', 'Draft Created', 'Blog replaced with new AI-generated draft.');
            }, 3000);
        };

        if (blogData.content && blogData.content.trim()) {
            showConfirmModal('Replace your entire blog with a brand new draft? Your current edits will be lost.', executeGeneration);
        } else {
            executeGeneration();
        }
    };

    // Sidebar AI Quick actions mapping
    const handleSidebarToolClick = (toolId) => {
        switch (toolId) {
            case 'titles':
                handleAIGenerateTitle();
                break;
            case 'improve':
                handleAIImproveContent();
                break;
            case 'seo':
                handleAIGenerateTags();
                break;
            case 'summarize':
                handleAISummarizeExcerpt();
                break;
            case 'thumbnail':
                handleAIGenerateThumbnail();
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.editBlogPage}>
            {/* Sidebar Navigation */}
            <EditorSidebar
                navItems={navItems}
                activeItem={activeNavItem}
                onNavItemClick={setActiveNavItem}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            <div className={styles.mainArea}>
                {/* Header Navbar */}
                <EditBlogNavbar
                    title={blogData.title}
                    saveStatus={saveStatus}
                    onSaveChanges={saveChanges}
                    onSaveAsDraft={saveAsDraft}
                    onPreview={() => setActiveModal('preview')}
                    onPublishUpdates={publishUpdates}
                    onCancel={handleCancel}
                />

                {/* Editor canvas and Helper side panel container */}
                <div className={styles.editorContainer}>
                    <EditBlogCanvas
                        blogData={blogData}
                        onChange={handleBlogDataChange}
                        loadingFields={loadingFields}
                        onAIGenerateTitle={handleAIGenerateTitle}
                        onAISummarizeExcerpt={handleAISummarizeExcerpt}
                        onAIGenerateTags={handleAIGenerateTags}
                        onAIImproveContent={handleAIImproveContent}
                        onAIContinueWriting={handleAIContinueWriting}
                        onAIRewriteSelected={handleAIRewriteSelected}
                        onAIExpandContent={handleAIExpandContent}
                        onAIShortenContent={handleAIShortenContent}
                    />
                    
                    <EditPostSettingsPanel
                        thumbnail={blogData.image}
                        onReplaceThumbnail={(url) => {
                            setBlogData(prev => ({ ...prev, image: url }));
                            setIsDirty(true);
                            setSaveStatus('idle');
                            addToast('success', 'Thumbnail Updated', 'Uploaded image applied as thumbnail.');
                        }}
                        onRemoveThumbnail={() => {
                            setBlogData(prev => ({ ...prev, image: '' }));
                            setIsDirty(true);
                            setSaveStatus('idle');
                            addToast('warning', 'Thumbnail Removed', 'Featured thumbnail has been removed.');
                        }}
                        onAIGenerateThumbnail={handleAIGenerateThumbnail}
                        onRegenerateThumbnail={handleAIGenerateThumbnail}
                        draftPrompt={draftPrompt}
                        onDraftPromptChange={setDraftPrompt}
                        onGenerateDraft={handleGenerateDraft}
                        onSidebarToolClick={handleSidebarToolClick}
                        loadingFields={loadingFields}
                    />
                </div>
            </div>

            {/* Slide-in Toast list */}
            <div className={styles.toastContainer}>
                {toasts.map(toast => (
                    <div 
                        key={toast.id} 
                        className={`${styles.toast} ${
                            toast.type === 'success' ? styles.toastSuccess : 
                            toast.type === 'error' ? styles.toastError : 
                            toast.type === 'warning' ? styles.toastWarning : styles.toastInfo
                        }`}
                    >
                        <div style={{ color: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : toast.type === 'warning' ? '#f59e0b' : '#8b5cf6', marginTop: '2px' }}>
                            <Sparkles size={16} />
                        </div>
                        <div className={styles.toastContent}>
                            <div className={styles.toastTitle}>{toast.title}</div>
                            <div className={styles.toastMessage}>{toast.message}</div>
                        </div>
                        <button className={styles.toastClose} onClick={() => removeToast(toast.id)}>
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Confirmation Modals Overlays */}
            
            {/* Modal: Replace/Overwrite confirmation */}
            {activeModal === 'replace-confirm' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={`${styles.modalIcon} ${styles.modalIconWarning}`}>
                                <AlertTriangle size={20} />
                            </div>
                            <h3 className={styles.modalTitle}>Overwrite Content?</h3>
                        </div>
                        <div className={styles.modalBody}>
                            You have modified this field since it was loaded. Are you sure you want to replace your current modifications with the AI-generated text? This action cannot be undone.
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnCancel} onClick={() => { setActiveModal(null); setPendingAction(null); }}>
                                Keep Existing
                            </button>
                            <button className={styles.btnDanger} onClick={() => { if (pendingAction) pendingAction(); }}>
                                Confirm Overwrite
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Unsaved Changes Warning */}
            {activeModal === 'unsaved-warning' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={`${styles.modalIcon} ${styles.modalIconWarning}`}>
                                <AlertTriangle size={20} />
                            </div>
                            <h3 className={styles.modalTitle}>Unsaved Changes</h3>
                        </div>
                        <div className={styles.modalBody}>
                            You have unsaved changes in this blog post. If you leave now, your latest modifications will be discarded. Are you sure you want to exit?
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnCancel} onClick={() => setActiveModal(null)}>
                                Stay on Page
                            </button>
                            <button className={styles.btnDanger} onClick={confirmLeave}>
                                Discard & Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Title Select Suggestions */}
            {activeModal === 'title-select' && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent} style={{ maxWidth: '600px' }}>
                        <div className={styles.modalHeader} style={{ justifyContent: 'space-between', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className={styles.modalIcon}>
                                    <Sparkles size={20} />
                                </div>
                                <h3 className={styles.modalTitle}>AI Title Suggestions</h3>
                            </div>
                            <button className={styles.toastClose} onClick={() => setActiveModal(null)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            Choose one of the generated options below to apply it to your blog post title:
                            <div className={styles.aiTitleList}>
                                {aiTitles.map((option, idx) => (
                                    <button 
                                        key={idx} 
                                        className={styles.aiTitleOption}
                                        onClick={() => selectTitle(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Fullscreen Live Preview */}
            {activeModal === 'preview' && (
                <div className={styles.modalOverlay} style={{ padding: '0' }}>
                    <div className={styles.previewModalContent}>
                        <div className={styles.previewTopBar}>
                            <div className={styles.previewTitleArea}>
                                <Eye size={18} style={{ color: '#8b5cf6' }} />
                                <span>Live Layout Preview</span>
                            </div>

                            {/* Responsive Size Controls */}
                            <div className={styles.deviceControls}>
                                <button 
                                    className={`${styles.deviceBtn} ${previewDevice === 'desktop' ? styles.deviceActive : ''}`}
                                    onClick={() => setPreviewDevice('desktop')}
                                >
                                    <Monitor size={14} />
                                    <span>Desktop</span>
                                </button>
                                <button 
                                    className={`${styles.deviceBtn} ${previewDevice === 'tablet' ? styles.deviceActive : ''}`}
                                    onClick={() => setPreviewDevice('tablet')}
                                >
                                    <Tablet size={14} />
                                    <span>Tablet</span>
                                </button>
                                <button 
                                    className={`${styles.deviceBtn} ${previewDevice === 'mobile' ? styles.deviceActive : ''}`}
                                    onClick={() => setPreviewDevice('mobile')}
                                >
                                    <Smartphone size={14} />
                                    <span>Mobile</span>
                                </button>
                            </div>

                            <button className={styles.closePreviewBtn} onClick={() => setActiveModal(null)}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Rendering simulated frame preview */}
                        <div className={styles.previewArea}>
                            <div className={`${styles.previewContainer} ${
                                previewDevice === 'desktop' ? styles.previewContainerDesktop :
                                previewDevice === 'tablet' ? styles.previewContainerTablet : styles.previewContainerMobile
                            }`}>
                                {blogData.image && (
                                    <img 
                                        src={blogData.image} 
                                        alt="Preview Thumbnail" 
                                        className={styles.previewHeroImage} 
                                    />
                                )}
                                
                                <div className={styles.previewBody}>
                                    <div className={styles.previewMeta}>
                                        <span className={styles.previewCategory}>
                                            {blogData.category || 'Artificial Intelligence'}
                                        </span>
                                        <span className={styles.previewReadTime}>
                                            {Math.ceil((blogData.content ? blogData.content.trim().split(/\s+/).filter(Boolean).length : 0) / 200) || 1} min read
                                        </span>
                                    </div>

                                    <h1 className={styles.previewTitle}>
                                        {blogData.title || 'Untitled Blog Post'}
                                    </h1>

                                    <div className={styles.previewAuthorSection}>
                                        <img 
                                            src={blogData.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                                            alt="Author Avatar" 
                                            className={styles.previewAuthorAvatar} 
                                        />
                                        <div>
                                            <div className={styles.previewAuthorName}>{blogData.author || 'Rehmat Khurshid'}</div>
                                            <div className={styles.previewAuthorRole}>Author, Scriptify AI</div>
                                        </div>
                                    </div>

                                    {blogData.excerpt && (
                                        <div className={styles.previewExcerpt}>
                                            {blogData.excerpt}
                                        </div>
                                    )}

                                    <div className={styles.previewTextContent}>
                                        {blogData.content || '*No content written yet.*'}
                                    </div>

                                    {blogData.tags && (
                                        <div className={styles.previewTags}>
                                            {blogData.tags.split(',').map((tag, idx) => (
                                                <span key={idx} className={styles.previewTag}>
                                                    #{tag.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditBlog;
