'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DemoStep {
  number: number;
  title: string;
  duration: string;
  description: string;
  route: string;
  talkingPoints: string[];
}

const demoSteps: DemoStep[] = [
  {
    number: 1,
    title: 'Landing Page — vutler.ai',
    duration: '1 min',
    description: 'Showcase Vutler as the next-generation AI-powered workspace for autonomous teams',
    route: '/',
    talkingPoints: [
      'Not a chatbot — it\'s a full workspace',
      'Multi-agent orchestration — agents collaborate autonomously',
      'Enterprise-ready — integrates with existing tools (email, calendar, file systems)',
    ],
  },
  {
    number: 2,
    title: 'Login & Dashboard',
    duration: '1.5 min',
    description: 'Command center with 13 agents active, weekly stats, real-time activity feed',
    route: '/dashboard',
    talkingPoints: [
      'Transparency — full visibility into what agents are doing',
      'Always-on — agents work 24/7 without supervision',
      'Metrics-driven — track productivity and ROI',
    ],
  },
  {
    number: 3,
    title: 'Agents — Team Overview & Detail',
    duration: '2.5 min',
    description: 'Explore agents list and Jarvis detail page (INTJ personality, Claude Opus 4)',
    route: '/agents',
    talkingPoints: [
      'Personality-driven AI — MBTI profiles create consistent, predictable behavior',
      'Modular LLM config — mix and match models per agent (cost optimization)',
      'Role-based access — agents have permissions and boundaries',
      'Pixel art avatars — humanizes the AI, builds team culture',
    ],
  },
  {
    number: 4,
    title: 'Calendar — Integrated Scheduling',
    duration: '1.5 min',
    description: '4 upcoming events, month/week/day views, auto-invite participants',
    route: '/calendar',
    talkingPoints: [
      'Autonomous scheduling — agents negotiate time slots',
      'Cross-platform sync — works with Google Calendar, Outlook, etc.',
      'Context-aware — agents know who needs to be in which meeting',
    ],
  },
  {
    number: 5,
    title: 'Tasks — Kanban Board & Workflows',
    duration: '2 min',
    description: 'Kanban board with Backlog, To Do, In Progress, Review, Done columns',
    route: '/tasks',
    talkingPoints: [
      'Self-organizing teams — agents claim work based on capacity and expertise',
      'Dependency tracking — no bottlenecks, automatic coordination',
      'Human-in-the-loop — you can jump in anytime, override, or delegate',
    ],
  },
  {
    number: 6,
    title: 'Chat — Multi-Channel Communication',
    duration: '2 min',
    description: '10 channels: #engineering, #product, #marketing, #operations, #customer-support...',
    route: '/chat',
    talkingPoints: [
      'Async-first — agents don\'t need meetings to collaborate',
      'Contextual awareness — agents know what\'s happening in each channel',
      'Human-readable logs — full transparency, audit trail',
      'Real-time responsiveness — agents reply in seconds, not hours',
    ],
  },
  {
    number: 7,
    title: 'Email — Postal Integration',
    duration: '1.5 min',
    description: 'Inbox powered by Postal: agents triage, draft replies, flag urgent issues',
    route: '/email',
    talkingPoints: [
      'Intelligent triage — agents prioritize what matters',
      'Context-aware responses — agents remember customer history',
      'Human-in-the-loop approval — for sensitive or high-stakes emails',
      'Postal integration — self-hosted, privacy-first email',
    ],
  },
  {
    number: 8,
    title: 'Drive — Synology File Access',
    duration: '1 min',
    description: 'Synology NAS files: Contracts, Presentations, Engineering Docs, Customer Data',
    route: '/drive',
    talkingPoints: [
      'Hybrid infrastructure — works with existing systems (Synology, S3, Google Drive)',
      'Version control — agents track changes and document edits',
      'Data sovereignty — your files stay on your hardware',
    ],
  },
  {
    number: 9,
    title: 'Providers — LLM Configuration',
    duration: '1.5 min',
    description: 'Configure Anthropic (Claude Opus 4), OpenAI (GPT-4), and local models',
    route: '/providers',
    talkingPoints: [
      'Multi-provider strategy — no vendor lock-in',
      'Cost optimization — use cheaper models for simple tasks, premium models for complex reasoning',
      'Security — API keys encrypted, never logged',
      'Future-proof — easy to add new providers as models improve',
    ],
  },
  {
    number: 10,
    title: 'Settings — Workspace Configuration',
    duration: '30 sec',
    description: 'Workspace rules, user management, integrations toggle, agent permissions, audit logs',
    route: '/settings',
    talkingPoints: [
      'Governance — control who (human or agent) can do what',
      'Audit trail — full compliance-ready logs',
      'Extensible — add integrations as you grow',
    ],
  },
];

export default function DemoPage() {
  const router = useRouter();
  const [timerActive, setTimerActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const targetDuration = 15 * 60; // 15 minutes in seconds

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min((elapsed / targetDuration) * 100, 100);
  const isOvertime = elapsed > targetDuration;

  const handleStartDemo = () => {
    setTimerActive(true);
    setElapsed(0);
  };

  const handleResetDemo = () => {
    setTimerActive(false);
    setElapsed(0);
  };

  const handleGoToStep = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-[#08090f] text-white">
      {/* Header */}
      <header className="bg-[#14151f] border-b border-[rgba(255,255,255,0.07)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/landing/vutler-logo-full-white.png" 
              alt="Vutler" 
              className="h-8"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Vutler Demo — Presenter Guide</h1>
              <p className="text-sm text-[#9ca3af]">Target: CEOs, CTOs, Investors | Duration: 15 min</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-[#9ca3af] hover:text-white transition-colors"
          >
            Exit Demo Mode
          </button>
        </div>
      </header>

      {/* Timer Section */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-[#14151f] border border-[rgba(255,255,255,0.07)] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Demo Timer</h2>
              <p className="text-sm text-[#9ca3af]">Target: 15:00 minutes</p>
            </div>
            <div className="flex items-center space-x-4">
              {!timerActive ? (
                <button
                  onClick={handleStartDemo}
                  className="px-6 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 focus:ring-offset-[#14151f]"
                >
                  Start Demo
                </button>
              ) : (
                <button
                  onClick={handleResetDemo}
                  className="px-6 py-2 bg-[#ef4444] hover:bg-[#dc2626] text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#ef4444] focus:ring-offset-2 focus:ring-offset-[#14151f]"
                >
                  Reset Timer
                </button>
              )}
            </div>
          </div>

          {/* Timer Display */}
          <div className="text-center mb-4">
            <div className={`text-5xl font-bold ${isOvertime ? 'text-[#ef4444]' : 'text-[#3b82f6]'}`}>
              {formatTime(elapsed)}
            </div>
            {isOvertime && (
              <p className="text-sm text-[#ef4444] mt-2">⚠️ Over target time</p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#1a1b2e] rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ${isOvertime ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Demo Steps Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Demo Timeline — 10 Steps</h2>
          {demoSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-[#14151f] border border-[rgba(255,255,255,0.07)] rounded-xl p-6 hover:border-[rgba(255,255,255,0.15)] transition-all duration-200"
            >
              {/* Step Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-[#9ca3af] mb-2">{step.description}</p>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-[#3b82f6]/20 text-[#3b82f6] rounded-full">
                      {step.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleGoToStep(step.route)}
                  className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#3b82f6] flex items-center space-x-2"
                >
                  <span>Go</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Talking Points */}
              {step.talkingPoints.length > 0 && (
                <div className="mt-4 pl-16">
                  <h4 className="text-sm font-semibold text-[#9ca3af] mb-2">💬 Talking Points:</h4>
                  <ul className="space-y-2">
                    {step.talkingPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-[#d1d5db]">
                        <span className="text-[#3b82f6] mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Closing Section */}
        <div className="mt-8 bg-gradient-to-br from-[#3b82f6]/10 to-[#2563eb]/10 border border-[#3b82f6]/30 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">🎯 Closing (30 sec)</h2>
          <p className="text-[#d1d5db] mb-4">
            "In 15 minutes, we've seen a fully autonomous AI workforce — managing email, scheduling, tasks, and decisions. 
            Vutler isn't replacing your team; it's scaling it. Imagine deploying 50, 100, or 1,000 agents, each specialized, 
            each learning, each working 24/7. That's the future we're building."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#14151f] border border-[rgba(255,255,255,0.07)] rounded-lg p-4">
              <h3 className="text-sm font-semibold text-[#3b82f6] mb-2">For Investors</h3>
              <p className="text-sm text-[#9ca3af]">We're raising a seed round to scale infrastructure and go-to-market.</p>
            </div>
            <div className="bg-[#14151f] border border-[rgba(255,255,255,0.07)] rounded-lg p-4">
              <h3 className="text-sm font-semibold text-[#3b82f6] mb-2">For Customers</h3>
              <p className="text-sm text-[#9ca3af]">We're onboarding design partners now. Let's talk about your use case.</p>
            </div>
          </div>
        </div>

        {/* Demo Tips */}
        <div className="mt-6 bg-[#14151f] border border-[rgba(255,255,255,0.07)] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[#f59e0b] mb-3">💡 Demo Tips</h3>
          <ul className="space-y-2 text-sm text-[#9ca3af]">
            <li>• Keep energy high — this is exciting technology</li>
            <li>• Pause for questions after agents (step 3) and email (step 7)</li>
            <li>• Have a backup plan if live demo fails (screen recording)</li>
            <li>• Tailor the script: emphasize cost savings for CFOs, technical architecture for CTOs, market opportunity for VCs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
