import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Sun, ChevronDown, Code2, CheckCircle2, ArrowLeft, Settings, Trash2, Link, Plus, X, Search, Zap } from 'lucide-react';

// --- Color Themes Definition ---
const COLOR_THEMES = {
  'dark-default': {
    name: 'VS Code Dark',
    keyword: 'text-pink-500 font-semibold',
    typeClass: 'text-yellow-400',
    function: 'text-blue-400',
    number: 'text-green-400',
    string: 'text-orange-400',
    default: 'text-gray-200',
  },
  'dark-monokai': {
    name: 'Monokai',
    keyword: 'text-pink-600 font-semibold',
    typeClass: 'text-yellow-300',
    function: 'text-green-300',
    number: 'text-purple-400',
    string: 'text-yellow-600',
    default: 'text-gray-200',
  },
  'dark-ocean': {
    name: 'Oceanic',
    keyword: 'text-cyan-400 font-semibold',
    typeClass: 'text-blue-300',
    function: 'text-fuchsia-400',
    number: 'text-emerald-300',
    string: 'text-yellow-400',
    default: 'text-gray-200',
  },
  'cotton-candy': {
    name: '🍬 Cotton Candy',
    keyword: 'text-pink-300 font-semibold',
    typeClass: 'text-purple-300',
    function: 'text-blue-200',
    number: 'text-teal-200',
    string: 'text-yellow-100',
    default: 'text-pink-50',
  },
  'matcha-latte': {
    name: '🍵 Matcha Latte',
    keyword: 'text-emerald-400 font-semibold',
    typeClass: 'text-lime-200',
    function: 'text-teal-300',
    number: 'text-orange-200',
    string: 'text-yellow-200',
    default: 'text-stone-300',
  },
  'unicorn-dream': {
    name: '🦄 Unicorn Dream',
    keyword: 'text-fuchsia-400 font-bold',
    typeClass: 'text-cyan-300',
    function: 'text-violet-300',
    number: 'text-yellow-300',
    string: 'text-pink-200',
    default: 'text-indigo-50',
  },
};


// --- Problem Data Definition (Static) ---
const staticProblemSet = [
  {
    id: 70,
    title: "Climbing Stairs",
    difficulty: "Easy",
    language: "Java",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top? This is a classic dynamic programming problem, often solved using the Fibonacci sequence.",
    code: `class Solution {
    public int climbStairs(int n) {
        int a = 1;
        int b = 1;

        for (int i = 0; i < n - 1; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
}`,
    split: "Solution {", 
  },
  {
    id: 20,
    title: "Valid Parentheses",
    difficulty: "Easy",
    language: "Python",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order. 3. Every close bracket has a corresponding open bracket of the same type.",
    code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        closeToOpen = { ")" : "(", "]" : "[", "}" : "{" }
        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)
        return True if not stack else False`,
    split: "Solution:", 
  }
];


// --- Settings Modal Component (No change) ---
const SettingsModal = ({ show, onClose, currentTheme, onThemeChange }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-950 p-8 rounded-lg border border-neutral-800 shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto flex flex-col">
                <div className="flex justify-between items-center border-b border-neutral-800 pb-3 mb-6 shrink-0">
                    <h2 className="text-2xl font-bold text-gray-100">Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition">
                        &times;
                    </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-200 mb-4 shrink-0">Code Color Scheme</h3>

                <div className="space-y-3 overflow-y-auto pr-2">
                    {Object.keys(COLOR_THEMES).map(themeKey => (
                        <div 
                            key={themeKey}
                            onClick={() => onThemeChange(themeKey)}
                            className={`p-4 rounded-lg cursor-pointer transition flex items-center justify-between group ${
                                currentTheme === themeKey 
                                    ? 'bg-indigo-600 border border-indigo-500 shadow-md shadow-indigo-900/50' 
                                    : 'bg-neutral-900 border border-neutral-800 hover:bg-neutral-800'
                            }`}
                        >
                            <span className={`font-medium transition ${currentTheme === themeKey ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                {COLOR_THEMES[themeKey].name}
                            </span>
                            
                            {/* Theme Preview Dots */}
                            <div className="flex gap-1 mr-2">
                                <div className={`w-3 h-3 rounded-full ${COLOR_THEMES[themeKey].keyword.split(' ')[0].replace('text-', 'bg-')}`}></div>
                                <div className={`w-3 h-3 rounded-full ${COLOR_THEMES[themeKey].function.split(' ')[0].replace('text-', 'bg-')}`}></div>
                                <div className={`w-3 h-3 rounded-full ${COLOR_THEMES[themeKey].string.split(' ')[0].replace('text-', 'bg-')}`}></div>
                            </div>

                            {currentTheme === themeKey && (
                                <CheckCircle2 size={18} className="text-white ml-2" />
                            )}
                        </div>
                    ))}
                </div>
                
                <button
                    onClick={onClose}
                    className="mt-8 w-full py-2 bg-neutral-800 text-gray-200 rounded-lg font-bold hover:bg-neutral-700 transition shrink-0"
                >
                    Close
                </button>
            </div>
        </div>
    );
};


// --- Problem Creator Component (Reverted to manual input only) ---
const ProblemCreator = ({ onAddProblem, onCancel }) => {
    const [title, setTitle] = useState('');
    const [language, setLanguage] = useState('Custom');
    const [difficulty, setDifficulty] = useState('Medium');
    const [code, setCode] = useState('');
    const [split, setSplit] = useState('');
    const [description, setDescription] = useState(''); // Keep description for manual entry
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && code.trim() && split.trim()) {
            onAddProblem({ title, language, difficulty, code, split, description });
            onCancel(); // Close form after submission
        } else {
            console.error("Please fill in Title, Code, and Split Point.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-neutral-800 rounded-lg border border-indigo-700/50 shadow-lg mt-6 mb-4">
            <h3 className="text-lg font-bold text-indigo-400 mb-4 border-b border-indigo-700 pb-2">Create New Problem</h3>
            
            <div className="space-y-3">
                
                {/* Title and Difficulty */}
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Problem Title (e.g., FizzBuzz)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-sm"
                        required
                    />
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-sm"
                    >
                        {['Easy', 'Medium', 'Hard', 'Custom'].map(d => (
                            <option key={d} value={d}>{d} Difficulty</option>
                        ))}
                    </select>
                </div>

                {/* Description (Manual Entry) */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full p-2 bg-neutral-900 text-gray-300 border border-neutral-700 rounded-lg text-xs font-sans resize-none"
                    placeholder="Problem Description (Optional, but recommended)"
                />
                
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Language (e.g., JavaScript)"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="flex-1 p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-sm"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Split Point (e.g., 'class Solution {' - Text that is already typed)"
                        value={split}
                        onChange={(e) => setSplit(e.target.value)}
                        className="flex-1 p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-sm font-mono"
                        required
                    />
                </div>

                <textarea
                    placeholder="Paste the full code solution here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="6"
                    className="w-full p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-sm font-mono resize-y"
                    required
                />
                
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-neutral-700 text-gray-300 rounded-lg text-sm font-bold hover:bg-neutral-600 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={!title.trim() || !code.trim() || !split.trim()}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition shadow-md shadow-indigo-900/50 disabled:bg-indigo-800 disabled:opacity-50"
                >
                    Add Problem
                </button>
            </div>
        </form>
    );
};


// --- Problem List Component (No change) ---
const ProblemList = ({ allProblems, onSelectProblem, onShowSettings, onAddProblem }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    
    // Sort problems to put user-added problems at the top (they have higher IDs/timestamps)
    const sortedProblems = [...allProblems].sort((a, b) => b.id - a.id);

    // Filtering logic
    const filteredProblems = sortedProblems.filter(problem => 
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 bg-neutral-950 rounded-lg border border-neutral-800 shadow-2xl w-full max-w-3xl relative">
            <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-3">
                <h2 className="text-2xl font-bold text-gray-100">Available Problems</h2>
                <button 
                    onClick={onShowSettings}
                    className="p-2 rounded-full text-gray-400 hover:text-indigo-400 hover:bg-neutral-800 transition"
                    title="Open Settings"
                >
                    <Settings size={20} />
                </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search problems by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 pl-10 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg text-md focus:border-indigo-500 focus:ring-indigo-500 transition"
                />
            </div>


            {/* Problem List Display */}
            <div className="space-y-3">
                {filteredProblems.length > 0 ? (
                    filteredProblems.map(problem => (
                        <div 
                            key={problem.id} 
                            className={`flex items-center justify-between p-4 rounded-lg transition duration-150 ease-in-out border 
                                ${problem.id > 100 ? 'bg-indigo-950 border-indigo-700/50 hover:bg-indigo-900/70' : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800'}
                            `}
                        >
                            <div className="flex flex-col">
                                <span className="text-lg text-gray-200 font-semibold">{problem.title}</span>
                                <div className="text-sm mt-1 space-x-2">
                                    <span className={`font-bold px-2 py-0.5 rounded-full ${
                                        problem.difficulty === 'Easy' ? 'text-green-500 bg-green-900/30' : 
                                        problem.difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-900/30' :
                                        problem.difficulty === 'Hard' ? 'text-red-500 bg-red-900/30' : 
                                        'text-blue-300 bg-blue-900/30'
                                    }`}>{problem.difficulty}</span>
                                    <span className="text-blue-400 font-medium px-2 py-0.5 rounded-full bg-blue-900/30">{problem.language}</span>
                                    {problem.id > staticProblemSet[staticProblemSet.length - 1].id && (
                                        <span className="text-purple-300 font-medium px-2 py-0.5 rounded-full bg-purple-900/30">User Created</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => onSelectProblem(problem.id)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition shadow-md shadow-indigo-900/50"
                            >
                                Start Typing
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-6 text-gray-500 border border-neutral-800 rounded-lg">
                        No problems found matching "{searchTerm}".
                    </div>
                )}
            </div>
            
            {/* New Problem Creation Form (Moved to bottom) */}
            {isCreating && (
                <ProblemCreator 
                    onAddProblem={onAddProblem}
                    onCancel={() => setIsCreating(false)}
                />
            )}
            
            {/* New Problem Creation Button (Moved to bottom) */}
            {!isCreating && (
                <button 
                    onClick={() => setIsCreating(true)}
                    className="w-full py-3 mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg text-md font-bold hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/50"
                >
                    <Plus size={20} /> Add a New Custom Problem
                </button>
            )}

            <p className="mt-6 text-sm text-gray-600 text-center">Select a problem or create your own above.</p>
        </div>
    );
};


// --- Problem Description Section (Simplified) ---
const ProblemDescription = ({ description }) => {
    // Simple Markdown to HTML converter for Description (Supports **bold**, and newlines)
    const formatDescription = (text) => {
        if (!text || text.trim() === '') return '<p class="text-gray-500 italic">No description available.</p>';

        let html = text
            // Replace **bold** with <strong>
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Replace triple dashes with a horizontal rule
            .replace(/---/g, '<hr class="my-3 border-neutral-700">')
            // Wrap text lines in paragraphs
            .split('\n')
            .map(line => line.trim().length > 0 ? `<p class="mt-1">${line}</p>` : '')
            .join('');

        return html;
    };

    return (
        <div className="border-t border-neutral-800 pt-4 mt-4">
            <h3 className="text-sm font-bold text-gray-400 mb-2">Problem Description</h3>
            <div 
                className="max-h-60 overflow-y-auto p-3 bg-neutral-900 text-gray-300 border border-neutral-700 rounded-lg text-sm font-sans leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
            />
        </div>
    );
};


// --- Notes Section Component (No change) ---
const NotesSection = ({ notes, setNotes }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftNotes, setDraftNotes] = useState(notes);

    useEffect(() => {
        setDraftNotes(notes);
    }, [notes]);

    const handleSave = () => {
        setNotes(draftNotes);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setDraftNotes(notes); // Ensure draft is in sync before editing
        setIsEditing(true);
    };

    // Simple Markdown to HTML converter (for display only)
    const formatNotes = (text) => {
        if (!text || text.trim() === '') return '<p class="text-gray-500 italic">No notes added.</p>';

        // 1. Basic formatting: Bold (using **)
        let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 2. Lists (using * at the start of a line)
        const lines = html.split('\n');
        let inList = false;
        let output = [];

        for (const line of lines) {
            const trimmedLine = line.trim();

            if (trimmedLine.startsWith('* ')) {
                const itemContent = trimmedLine.substring(2).trim();
                if (!inList) {
                    // Start a new unordered list
                    output.push('<ul class="list-disc list-inside space-y-1 mt-2">');
                    inList = true;
                }
                output.push(`<li class="ml-4">${itemContent}</li>`);
            } else {
                if (inList) {
                    // End the current list
                    output.push('</ul>');
                    inList = false;
                }
                // Convert remaining text to paragraph, respecting empty lines
                if (trimmedLine.length > 0) {
                    output.push(`<p class="mt-2">${trimmedLine}</p>`);
                }
            }
        }
        if (inList) output.push('</ul>');

        return output.join('');
    };


    return (
        <div className="mt-4 border-t border-neutral-800 pt-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-gray-400">Notes</h3>
                {!isEditing ? (
                    <button 
                        onClick={handleEdit}
                        className="text-xs text-blue-400 hover:text-blue-300 transition px-2 py-1 rounded bg-neutral-800"
                    >
                        Edit
                    </button>
                ) : (
                    <button 
                        onClick={handleSave}
                        className="text-xs text-green-400 hover:text-green-300 transition px-2 py-1 rounded bg-neutral-800 font-semibold"
                    >
                        Save
                    </button>
                )}
            </div>
            
            {isEditing ? (
                <textarea
                    value={draftNotes}
                    onChange={(e) => setDraftNotes(e.target.value)}
                    className="w-full min-h-[150px] p-3 bg-neutral-800 text-gray-200 border border-neutral-700 rounded-lg resize-y focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans text-sm"
                    placeholder="Use * for bullet points (e.g., * Item 1) and ** for bold text (e.g., **Key Point**)"
                />
            ) : (
                <div 
                    className="min-h-[150px] p-3 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg overflow-y-auto font-sans text-sm"
                    dangerouslySetInnerHTML={{ __html: formatNotes(notes) }}
                />
            )}
            <p className="mt-2 text-xs text-gray-600 font-sans italic">Formatting guide: Start a line with * followed by a space for a bullet point. Wrap text in **double asterisks** for bolding.</p>
        </div>
    );
};

// --- Resources Section Component (No change) ---
const ResourcesSection = ({ resources, setResources }) => {
    const [newTitle, setNewTitle] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [isAddingLink, setIsAddingLink] = useState(false); 
    
    const handleAddResource = () => {
        if (newTitle.trim() && newUrl.trim()) {
            const safeUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
            const newResource = {
                id: Date.now(), 
                title: newTitle.trim(),
                url: safeUrl,
            };
            setResources(prev => [...prev, newResource]);
            setNewTitle('');
            setNewUrl('');
            setIsAddingLink(false); 
        }
    };

    const handleDeleteResource = (id) => {
        setResources(prev => prev.filter(res => res.id !== id));
    };

    return (
        <div className="mt-4 border-t border-neutral-800 pt-4">
            <h3 className="text-sm font-bold text-gray-400 mb-3">Linked Resources ({resources.length})</h3>

            {/* Link Addition Trigger/Form */}
            <div className="mb-4">
                {!isAddingLink ? (
                    // Collapsed state: Show button to add a new link
                    <button
                        onClick={() => setIsAddingLink(true)}
                        className="w-full py-2 flex items-center justify-center gap-2 bg-neutral-800 text-indigo-400 rounded-lg text-sm font-medium hover:bg-neutral-700 transition"
                    >
                        <Plus size={16} /> Add a new resource...
                    </button>
                ) : (
                    // Expanded state: Show input fields
                    <div className="flex flex-col gap-2 p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-sans"
                            placeholder="Resource Title (e.g., LeetCode Link)"
                        />
                        <input
                            type="url"
                            value={newUrl}
                            onChange={(e) => setNewUrl(e.target.value)}
                            className="w-full p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-sans"
                            placeholder="Paste URL here (e.g., example.com/doc)"
                        />
                        <div className="flex justify-end gap-2 mt-1">
                            <button
                                onClick={() => setIsAddingLink(false)}
                                className="px-3 py-1 bg-neutral-700 text-gray-300 rounded-lg text-xs font-bold hover:bg-neutral-600 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddResource}
                                disabled={!newTitle.trim() || !newUrl.trim()}
                                className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition shadow-md disabled:bg-indigo-800 disabled:opacity-50"
                            >
                                <Link size={14} className="inline-block mr-1" /> Insert Link
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Display list of resources (Only show list if resources exist) */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {resources.map(res => (
                    <div 
                        key={res.id} 
                        className="flex items-center justify-between p-2 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800 transition"
                    >
                        <a 
                            href={res.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-400 hover:text-blue-300 transition truncate flex-1"
                            title={res.url}
                        >
                            {res.title}
                        </a>
                        <button
                            onClick={() => handleDeleteResource(res.id)}
                            className="p-1 ml-3 text-red-500 hover:text-red-400 hover:bg-neutral-700 rounded transition"
                            title="Delete Resource"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Tags Section Component (No change) ---
const TagsSection = ({ tags, setTags }) => {
    const [newTagInput, setNewTagInput] = useState('');
    const [isAddingTag, setIsAddingTag] = useState(false); 

    const handleAddTag = (e) => {
        if (e) e.preventDefault(); 
        const tag = newTagInput.trim();
        if (tag && !tags.includes(tag) && tags.length < 10) { 
            setTags(prev => [...prev, tag]);
            setNewTagInput('');
            setIsAddingTag(false); 
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="mt-4 border-t border-neutral-800 pt-4">
            <h3 className="text-sm font-bold text-gray-400 mb-3">Tags ({tags.length})</h3>
            
            {/* Display list of tags */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-8">
                {tags.map((tag, index) => (
                    <div 
                        key={index} 
                        className="flex items-center bg-indigo-900/50 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium"
                    >
                        {tag}
                        <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-indigo-400 hover:text-white transition"
                            title={`Remove tag: ${tag}`}
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Tag Addition Trigger/Form */}
            <div className="mb-2">
                {!isAddingTag ? (
                    <button
                        onClick={() => setIsAddingTag(true)}
                        className="w-full py-2 flex items-center justify-center gap-2 bg-neutral-800 text-indigo-400 rounded-lg text-sm font-medium hover:bg-neutral-700 transition"
                    >
                        <Plus size={16} /> Add a new tag...
                    </button>
                ) : (
                    <form onSubmit={handleAddTag} className="flex gap-2 p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                        <input
                            type="text"
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            className="flex-1 p-2 bg-neutral-900 text-gray-200 border border-neutral-700 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm font-sans"
                            placeholder="Tag name (e.g., Dynamic Programming)"
                        />
                         <button
                            type="button" 
                            onClick={() => setIsAddingTag(false)}
                            className="px-3 py-1 bg-neutral-700 text-gray-300 rounded-lg text-xs font-bold hover:bg-neutral-600 transition flex-shrink-0"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!newTagInput.trim()}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-500 transition shadow-md flex-shrink-0 disabled:bg-indigo-800 disabled:opacity-50"
                            title="Add Tag"
                        >
                            <Plus size={14} className="inline-block" /> 
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};


// --- Main Application Component (Completed with older, non-Firebase logic) ---
const CodeTypingTrainer = () => {
  // Revert initial problem ID to a static problem
  const [currentView, setCurrentView] = useState('list'); 
  const [currentProblemId, setCurrentProblemId] = useState(70); // Default to Climbing Stairs
  const [typedText, setTypedText] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [notes, setNotes] = useState(''); // Corrected state declaration
  const [resources, setResources] = useState([]); // Added missing state
  const [tags, setTags] = useState([]); // Added missing state
  const [theme, setTheme] = useState('dark-default'); 
  const [showSettings, setShowSettings] = useState(false); 
  // User problems start empty
  const [userProblems, setUserProblems] = useState([]); 
  const containerRef = useRef(null);

  // Combine static and user-added problems
  const allProblems = [...staticProblemSet, ...userProblems];
  
  const currentProblem = allProblems.find(p => p.id === currentProblemId);
  // Fallback to empty string if problem is null
  const targetCode = currentProblem ? currentProblem.code : '';
  const activeTheme = COLOR_THEMES[theme];


  // Function to add a new problem
  const handleAddProblem = (newProblemData) => {
    const newProblem = {
        ...newProblemData,
        id: Date.now(), // Unique ID based on timestamp
        difficulty: newProblemData.difficulty || "Custom",
        language: newProblemData.language || "Custom",
        description: newProblemData.description || "No description provided."
    };
    // Add new problems to the userProblems state
    setUserProblems(prev => [newProblem, ...prev]); 
  };


  // Effect to initialize typing state when problem changes or component mounts
  useEffect(() => {
      if (currentProblem) {
          let initialText = currentProblem.code;
          // Find the index to cut the initial text
          const splitIndex = initialText.indexOf(currentProblem.split);
          // Calculate the split point, making sure to include the split string itself
          const splitPoint = splitIndex === -1 ? initialText.length : splitIndex + currentProblem.split.length;

          setTypedText(initialText.slice(0, splitPoint));
          setIsComplete(false);
          setStartTime(null);
          // Reset workspace data on problem switch (since there is no persistence in this version)
          setNotes('');
          setResources([]);
          setTags([]);

          // Focus the container if we are in the typing view
          if (containerRef.current && currentView === 'typing') {
              containerRef.current.focus();
          }
      } else if (currentView === 'typing') {
        setCurrentView('list');
      }
  }, [currentProblemId, currentView, currentProblem]); 


  // Calculate progress
  const progress = targetCode.length > 0 ? Math.min(100, Math.round((typedText.length / targetCode.length) * 100)) : 0;

  const handleKeyDown = (e) => {
    // === FIX: Ignore key presses if focused on a form input element ===
    const targetTagName = e.target.tagName;
    if (targetTagName === 'INPUT' || targetTagName === 'TEXTAREA' || targetTagName === 'SELECT') {
        return;
    }
    // =================================================================

    if (isComplete || currentView !== 'typing') return;

    // Prevent default scrolling behaviors (especially Tab)
    if (e.key === " " || e.key === "Tab") {
      e.preventDefault();
    }

    const { key } = e;
    const currentLength = typedText.length;
    const nextChar = targetCode[currentLength];

    if (!startTime) setStartTime(Date.now());

    // Handle Backspace
    if (key === 'Backspace') {
      // Find the index of the split point in the target code
      const initialSplitIndex = targetCode.indexOf(currentProblem.split) + currentProblem.split.length;
      
      // Only allow backspace if the typed text length is greater than the initial split point
      if (typedText.length > initialSplitIndex) {
        setTypedText(prev => prev.slice(0, -1));
      }
      return;
    }

    // Strict typing mode: Input must match the target code
    if (key.length === 1 || key === 'Enter') {
       
       // >>> Automatic Indentation on Enter <<<
       if (key === 'Enter' && nextChar === '\n') {
           let newText = typedText + '\n';
           let lookAheadIndex = currentLength + 1;
           let spacesToInsert = '';

           // Scan forward for all required leading whitespace on the new line
           while (lookAheadIndex < targetCode.length && targetCode[lookAheadIndex] === ' ') {
               spacesToInsert += ' ';
               lookAheadIndex++;
           }
           
           setTypedText(newText + spacesToInsert);
           return;
       }
       
       // Handle indentation helper (Tab consumes the required leading spaces)
       if (key === 'Tab') {
            let spaceCount = 0;
            // Scan forward in the target code to see how many spaces or tabs are required next
            for(let i = currentLength; i < targetCode.length; i++) {
                if(targetCode[i] === ' ') {
                    spaceCount++;
                } else if (targetCode[i] === '\n') {
                    break; 
                } else {
                    break;
                }
            }
            // If we found required whitespace, consume it
            if(spaceCount > 0) {
                 setTypedText(prev => prev + targetCode.substring(currentLength, currentLength + spaceCount));
            }
            return;
        }

       // Normal character check
       if (key === nextChar) {
         setTypedText(prev => prev + key);
       } 
    }

    // Check for completion after key press
    if (typedText.length + 1 >= targetCode.length) {
      setIsComplete(true);
    }
  };

  // Simple syntax highlighting helper for the 'completed' text
  const highlightSyntax = (code, language) => {
    // Keywords change based on language
    const javaKeywords = /\b(class|public|int|return|for|if|else|void|static|while|null)\b/g;
    const pythonKeywords = /\b(class|def|return|for|if|else|in|is|not|True|False)\b/g;

    const keywords = language === 'Java' ? javaKeywords : pythonKeywords;
    
    // Split by non-word characters but keep delimiters to reconstruct structure
    const parts = code.split(/([a-zA-Z0-9_]+|[^a-zA-Z0-9_\s])/);
    
    return parts.map((part, i) => {
      let className = activeTheme.default; // Default text color
      
      // Check keywords
      if (keywords.test(part)) className = activeTheme.keyword;
      // Classes/Types (Expanded list)
      else if (/\b(Solution|str|bool|ListNode)\b/.test(part)) className = activeTheme.typeClass;
      // Functions (Expanded list)
      else if (/\b(climbStairs|isValid|append|pop|hasCycle)\b/.test(part)) className = activeTheme.function;
      // Numbers
      else if (/^\d+$/.test(part)) className = activeTheme.number;
      // Strings/Literals (simplified check for quote marks)
      else if (/["']/.test(part)) className = activeTheme.string;
      
      return <span key={i} className={className}>{part}</span>;
    });
  };
  
  const handleSelectProblem = (id) => {
    setCurrentProblemId(id);
    setCurrentView('typing');
  };

  const handleReset = () => {
    // Rerun the initialization logic
    if (!currentProblem) return;
    const initialText = currentProblem.code;
    const splitIndex = initialText.indexOf(currentProblem.split);
    const splitPoint = splitIndex === -1 ? initialText.length : splitIndex + currentProblem.split.length;

    setTypedText(initialText.slice(0, splitPoint));
    setIsComplete(false);
    setStartTime(null);
    if(containerRef.current) containerRef.current.focus();
  };

  return (
    <>
        <div 
          className="min-h-screen bg-neutral-900 text-gray-300 font-sans flex flex-col items-center justify-center p-4 select-none outline-none"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          ref={containerRef}
        >
          
          {currentView === 'list' && (
            <ProblemList 
                allProblems={allProblems} 
                onSelectProblem={handleSelectProblem} 
                onShowSettings={() => setShowSettings(true)}
                onAddProblem={handleAddProblem} 
            />
          )}

          {currentView === 'typing' && currentProblem && (
            <div className="w-full max-w-3xl bg-neutral-950 rounded-lg border border-neutral-800 shadow-2xl overflow-hidden flex flex-col relative">
              
              {/* Header */}
              <div className="bg-neutral-900 border-b border-neutral-800 p-3 flex items-center justify-between text-sm">
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setCurrentView('list')} 
                        className="p-1 rounded hover:bg-neutral-800 transition"
                        title="Back to problem list"
                    >
                        <ArrowLeft size={18} className="text-gray-400" />
                    </button>
                    <span className={`font-bold ${currentProblem.difficulty === 'Easy' ? 'text-green-500' : 'text-yellow-500'}`}>
                        [{currentProblem.difficulty}]
                    </span>
                    <span className="font-medium text-gray-100">{currentProblem.title}</span>
                </div>
                
                <div className="flex items-center gap-3">
                    
                    {/* Solution Selector */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-900/50 rounded-lg cursor-pointer hover:bg-indigo-900/70 transition border border-indigo-700/50">
                        <span className="text-indigo-300 font-semibold text-xs">Solution #1</span>
                        <div className="w-px h-3 bg-indigo-700"></div>
                        <span className="text-blue-400 font-medium text-xs">{currentProblem.language}</span>
                        <ChevronDown size={14} className="text-indigo-400" />
                    </div>

                    <div className="h-4 w-px bg-neutral-700"></div>
                    <RefreshCw 
                        size={16} 
                        className="cursor-pointer hover:text-white transition" 
                        onClick={handleReset}
                    />
                    <Sun size={16} className="cursor-pointer hover:text-white transition" />
                </div>
              </div>

              {/* Editor Area */}
              <div className="flex-1 p-6 overflow-y-auto relative min-h-[400px]">
                <div className="flex">
                  {/* Line Numbers */}
                  <div className="flex flex-col text-right pr-4 text-gray-600 select-none border-r border-neutral-800 mr-4 font-mono text-base leading-relaxed">
                    {targetCode.split('\n').map((_, i) => (
                      <div key={i} className="h-6">{i + 1}</div>
                    ))}
                  </div>

                  {/* Code Content (Uses font-mono) */}
                  <div className="flex-1 font-mono text-base whitespace-pre leading-relaxed relative">
                    
                    {/* Layer 1: Ghost Text (The full code, dimmed) */}
                    <div className="absolute top-0 left-0 text-gray-700 pointer-events-none select-none z-0">
                      {targetCode}
                    </div>

                    {/* Layer 2: Typed Text (Highlighted) + Cursor */}
                    <div className="absolute top-0 left-0 z-10 pointer-events-none">
                      <span className="relative">
                        {highlightSyntax(typedText, currentProblem.language)}
                        
                        {/* The Cursor */}
                        {!isComplete && (
                          <span className="inline-block w-2.5 h-5 bg-red-500 align-middle animate-pulse ml-0.5 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                        )}
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Footer / Progress & Notes */}
              <div className="bg-neutral-900 border-t border-neutral-800 p-4">
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between mb-2 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      <span>Progress</span>
                      <span>{progress}% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300 ease-out"
                          style={{ width: `${progress}%` }}
                      ></div>
                  </div>

                  {/* Status Messages */}
                  <div className="mt-4 flex justify-between items-center text-sm">
                      <div className="text-gray-500 flex items-center gap-2">
                        {isComplete ? (
                            <span className="text-green-500 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Code Compiled Successfully
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Code2 size={16} /> Type the code above to continue...
                            </span>
                        )}
                      </div>
                      {isComplete && (
                          <button className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-green-500 text-xs font-bold transition shadow-lg shadow-green-900/50">
                              SUBMIT SOLUTION
                          </button>
                      )}
                  </div>
                  
                  {/* Problem Description */}
                  <ProblemDescription description={currentProblem.description} />

                  {/* Notes Section */}
                  <NotesSection notes={notes} setNotes={setNotes} />
                  
                  {/* Resources Section */}
                  <ResourcesSection 
                      resources={resources} 
                      setResources={setResources} 
                  />

                  {/* Tags Section */}
                  <TagsSection tags={tags} setTags={setTags} />
              </div>

            </div>
          )}

          {/* Instructions Overlay (Mobile/Initial) */}
          <div className="mt-8 text-gray-600 text-sm max-w-md text-center">
            <p className="mb-2">Code Typing Challenge</p>
            <p className="opacity-50 text-xs">The editor now automatically indents after pressing <span className="text-white bg-neutral-800 px-1 py-0.5 rounded">Enter</span>. Use <span className="text-white bg-neutral-800 px-1 py-0.5 rounded">Tab</span> to quickly enter the required indentation mid-line.</p>
          </div>

        </div>

        {/* Settings Modal */}
        <SettingsModal 
            show={showSettings} 
            onClose={() => setShowSettings(false)}
            currentTheme={theme}
            onThemeChange={setTheme}
        />
    </>
  );
};

export default CodeTypingTrainer;