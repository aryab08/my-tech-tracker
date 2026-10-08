import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Trash2,
  BookOpen,
  Code2,
  Lightbulb,
  ArrowRight,
  Maximize2,
  Minimize2,
  X,
  MessageSquare
} from 'lucide-react';

export default function AIChatBot({ isFloating = false, onCloseFloating = null }) {
  const {
    roadmaps,
    projects,
    getOverallLearningStats,
    getRoadmapStats,
    setActiveRoadmapId,
    setActiveTab
  } = useApp();

  const overallStats = getOverallLearningStats();

  // Initial greeting message
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello! I am your **My Tech Tracker AI Assistant**. 🤖\n\nI can help you with:\n- **Study Advice & Explanations** (Web Dev, DSA, AI/ML, React Native, System Design)\n- **Roadmap Guidance** (Recommending what topic or DSA problem to tackle next)\n- **Project Engineering** (Breaking down project checklists & tech stacks)\n\nHow can I help your learning today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Quick Prompt Suggestions
  const quickPrompts = [
    "What topic should I study next?",
    "Explain Kadane's Algorithm simply",
    "How do Next.js Server Actions work?",
    "Suggest a learning plan for DSA Graphs",
    "How to prepare for System Design?"
  ];

  // Helper function to generate AI Responses based on prompt and roadmap state
  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Next topic recommendations
    if (q.includes('next') || q.includes('should i study') || q.includes('recommend') || q.includes('what to study')) {
      const incompleteRoadmaps = roadmaps.map(rm => {
        const s = getRoadmapStats(rm.id);
        return { ...rm, stats: s };
      }).filter(rm => rm.stats.remaining > 0);

      if (incompleteRoadmaps.length === 0) {
        return `🎉 **Amazing job!** You have completed all topics across your roadmaps! Consider creating a new custom roadmap or starting a new full-stack project.`;
      }

      const topTarget = incompleteRoadmaps[0];
      // Find first uncompleted section & topic
      let nextTopicName = 'the next available module';
      for (const sec of topTarget.sections) {
        if (sec.subsections) {
          for (const sub of sec.subsections) {
            const firstRemaining = sub.items?.find(i => !i.completed);
            if (firstRemaining) {
              nextTopicName = `**${firstRemaining.title}** in *${sec.title} → ${sub.title}*`;
              break;
            }
          }
        }
        if (nextTopicName !== 'the next available module') break;
      }

      return `Based on your current progress (**${overallStats.completed}/${overallStats.total} topics completed, ${overallStats.percentage}%**):\n\nI recommend focusing on **${topTarget.title}**.\n👉 Next target: ${nextTopicName}.\n\n*Tip: Consistent daily practice of 3 topics per day will get you to 100% completion faster!*`;
    }

    // 2. Kadane's Algorithm
    if (q.includes('kadane')) {
      return `### 🧠 Kadane's Algorithm (Max Subarray Sum)\n\n**Intuition:**\nKadane's algorithm finds the contiguous subarray with the maximum sum in $O(N)$ time.\n\n**Algorithm:**\n1. Maintain \`currentMax\` and \`globalMax\` initialized to the first element.\n2. Iterate through the array. For each element $x$:\n   $$\\text{currentMax} = \\max(x, \\text{currentMax} + x)$$\n   $$\\text{globalMax} = \\max(\\text{globalMax}, \\text{currentMax})$$\n3. Return \`globalMax\`.\n\n\`\`\`cpp\nint maxSubArray(vector<int>& nums) {\n    int currentMax = nums[0], globalMax = nums[0];\n    for(int i = 1; i < nums.size(); i++) {\n        currentMax = max(nums[i], currentMax + nums[i]);\n        globalMax = max(globalMax, currentMax);\n    }\n    return globalMax;\n}\n\`\`\`\n\nNeed to revise the problem? Check out **3. Solve Problems on Arrays → Medium** in your DSA roadmap!`;
    }

    // 3. Next.js Server Actions
    if (q.includes('server action') || q.includes('next.js') || q.includes('nextjs')) {
      return `### ⚡ Next.js Server Actions Overview\n\n**What are Server Actions?**\nServer Actions allow you to run asynchronous code directly on the server without manually defining API route handlers.\n\n**Key Benefits:**\n- Invoked directly from client components or HTML forms.\n- Progressive enhancement support with native `<form>` submission.\n- Reduced boilerplate code.\n\n\`\`\`tsx\n// app/actions.ts\n'use server';\n\nexport async function updateUserProfile(formData: FormData) {\n  const name = formData.get('name');\n  // Update database directly on server...\n}\n\`\`\`\n\nYou can track this topic inside **Web Development → Phase 13 — Next.js**!`;
    }

    // 4. DSA Graphs guidance
    if (q.includes('graph') || q.includes('dsa graph')) {
      return `### 🕸️ Strategy for Learning Graphs in DSA\n\nFollow this step-by-step sequence:\n1. **Representation**: Master Adjacency List & Matrix.\n2. **Traversals**: Learn BFS (Level-order queue) and DFS (Recursion stack).\n3. **Cycle Detection**: Practice undirected & directed graph cycle checks.\n4. **Topological Sort**: Master Kahn's BFS Algorithm & DFS Topo.\n5. **Shortest Paths**: Dijkstra's Algorithm (Priority Queue), Bellman-Ford, and Floyd-Warshall.\n6. **Disjoint Set & MST**: Union-Find by Rank, Prim's and Kruskal's algorithms.\n\nYour DSA roadmap has **15. Graphs** with 21 dedicated problem checkboxes ready for you!`;
    }

    // 5. System Design
    if (q.includes('system design') || q.includes('architecture')) {
      return `### 🏗️ System Design Core Concepts\n\nWhen designing large-scale distributed systems, consider:\n- **Load Balancing**: Nginx, HAProxy, Round-robin vs Least Connections.\n- **Database Scaling**: Sharding, Replication (Leader-Follower), Read Replicas.\n- **Caching**: Redis / Memcached strategies (Write-through, Cache-aside).\n- **Asynchronous Processing**: Message Queues (RabbitMQ, Apache Kafka).\n- **Storage**: S3 for blob media, CDN for edge distribution.\n\n*Tip: You can add "System Design" as a custom roadmap by clicking "+ Add Roadmap" in your sidebar!*`;
    }

    // 6. Generic learning response
    return `Great question regarding **"${query}"**!\n\nHere are the key technical takeaways:\n- **Focus on Fundamentals**: Ensure you understand the underlying mechanics before moving to advanced abstraction.\n- **Hands-on Building**: Combine reading syllabus topics with building real project modules.\n- **Track Progress**: Don't forget to check off completed items in your roadmap to keep your statistics updated!\n\nWould you like a code example, or guidance on which syllabus phase covers this?`;
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking response delay
    setTimeout(() => {
      const aiReplyText = generateAIResponse(text);
      const aiMsg = {
        id: `m-ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className={`bg-slate-900 border border-slate-800 shadow-2xl flex flex-col ${
      isFloating
        ? 'w-[420px] h-[580px] rounded-3xl overflow-hidden'
        : 'max-w-5xl mx-auto h-[calc(100vh-140px)] rounded-3xl border my-6'
    }`}>
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm flex items-center gap-1.5">
              <span>My Tech Tracker AI</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Roadmap & Code Assistant Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          {isFloating && onCloseFloating && (
            <button
              onClick={onCloseFloating}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-950/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[82%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
              msg.sender === 'user'
                ? 'bg-indigo-600 text-white rounded-tr-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-lg'
            }`}>
              <div className="whitespace-pre-wrap font-sans">
                {msg.text.split('\n').map((line, idx) => {
                  if (line.startsWith('### ')) {
                    return <h4 key={idx} className="font-bold text-sm text-cyan-300 mt-2 mb-1">{line.replace('### ', '')}</h4>;
                  }
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={idx} className="font-bold text-white my-1">{line.replace(/\*\*/g, '')}</p>;
                  }
                  return <p key={idx}>{line}</p>;
                })}
              </div>
              <span className={`text-[10px] block text-right font-mono ${msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-[11px] font-medium whitespace-nowrap border border-slate-700 transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask AI anything about roadmaps, DSA, code..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold disabled:opacity-40 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
