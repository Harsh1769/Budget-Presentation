/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  Building2, 
  GraduationCap, 
  Sprout, 
  Info,
  ExternalLink,
  Target,
  Sun,
  Moon
} from 'lucide-react';
import { getBudgetHighlights } from './services/budgetService';
import { RupeePieChart, AllocationBarChart } from './components/BudgetCharts';
import { cn } from './lib/utils';

interface BudgetData {
  agriculture: string;
  education: string;
  infrastructure: string;
  fiscalDeficit: string;
  rupeeComesFrom: { name: string; value: number }[];
  rupeeGoesTo: { name: string; value: number }[];
  taxSlabs: string;
  viksitBharat: string;
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  useEffect(() => {
    async function fetchData() {
      const data = await getBudgetHighlights();
      setBudgetData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const slides = [
    {
      id: 'intro',
      title: "Welcome to Your 2026-27 Budget Guide",
      subtitle: "Making sense of India's financial plan in simple terms",
      content: (
        <div className="space-y-8 text-center flex flex-col h-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            <div className="flex justify-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800 shadow-sm"
              >
                <BookOpen className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-widest">The Theory</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800 shadow-sm"
              >
                <TrendingUp className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <p className="text-sm font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-widest">The Reality</p>
              </motion.div>
            </div>
            <p className="text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Ever wondered how a country manages its money? Let's break down the 2026-27 Budget using simple concepts from your economics textbook.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4"
          >
            <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Personalize Your View</p>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
              <button 
                onClick={() => setIsDarkMode(false)}
                className={cn(
                  "flex items-center gap-3 px-8 py-2.5 rounded-full transition-all duration-300",
                  !isDarkMode ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                <Sun size={20} />
                <span className="text-sm font-black uppercase tracking-wider">Light</span>
              </button>
              <button 
                onClick={() => setIsDarkMode(true)}
                className={cn(
                  "flex items-center gap-3 px-8 py-2.5 rounded-full transition-all duration-300",
                  isDarkMode ? "bg-white dark:bg-slate-700 shadow-md text-indigo-400" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                )}
              >
                <Moon size={20} />
                <span className="text-sm font-black uppercase tracking-wider">Dark</span>
              </button>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'definition',
      title: "1. What is a Budget?",
      subtitle: "The Government's Annual Financial Plan",
      content: (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-indigo-600 text-white p-8 rounded-3xl shadow-xl shadow-indigo-200 dark:shadow-none">
              <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-70">Official Definition</h4>
              <p className="text-xl font-medium italic leading-relaxed">
                "A statement of the estimated receipts and expenditure of the Government for the year."
              </p>
              <p className="mt-4 text-sm font-bold opacity-80">— Article 112 of the Constitution</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">1</div>
                <p className="font-medium">Covers April 1st to March 31st</p>
              </div>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">2</div>
                <p className="font-medium">Approved by the Parliament</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700"
          >
            <h4 className="font-black text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-widest text-sm">Why do we need it?</h4>
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-black text-indigo-500 uppercase mb-1">Goal 1</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">Economic Stability</p>
                <p className="text-sm text-slate-500">Keeping prices steady and growth high.</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-xs font-black text-emerald-500 uppercase mb-1">Goal 2</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">Social Welfare</p>
                <p className="text-sm text-slate-500">Helping the poor and reducing inequality.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'types',
      title: "2. Types of Budgets",
      subtitle: "Balanced, Surplus, or Deficit?",
      content: (
        <div className="space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-2">Balanced</h4>
              <p className="text-xs text-slate-400 uppercase font-bold mb-3">Income = Spending</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Perfect on paper, but hard for growing countries.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h4 className="text-lg font-black text-slate-800 dark:text-slate-200 mb-2">Surplus</h4>
              <p className="text-xs text-emerald-500 uppercase font-bold mb-3">Income &gt; Spending</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Saving money for the future. Great for rich nations.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 dark:shadow-none text-white"
            >
              <h4 className="text-lg font-black mb-2">Deficit</h4>
              <p className="text-xs text-indigo-200 uppercase font-bold mb-3">Spending &gt; Income</p>
              <p className="text-sm text-indigo-100">Borrowing to invest in growth for 2026-27.</p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900 dark:bg-black p-8 rounded-3xl text-center"
          >
            <p className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs mb-2">India's 2026-27 Choice</p>
            <h4 className="text-3xl font-black text-white mb-2">Deficit Budget for Growth</h4>
            <p className="text-slate-400">Targeting a fiscal deficit of <span className="text-emerald-400 font-bold">{budgetData?.fiscalDeficit}</span> to keep the economy booming.</p>
          </motion.div>
        </div>
      )
    },
    {
      id: 'accounts',
      title: "3. Revenue vs. Capital",
      subtitle: "Daily Expenses vs. Long-term Assets",
      content: (
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl text-white"><Sun size={24} /></div>
              <h4 className="text-xl font-black text-blue-900 dark:text-blue-200">Revenue Account</h4>
            </div>
            <p className="text-blue-800 dark:text-blue-300 font-medium mb-6">Think of this as your "Daily Pocket Money" for running the house.</p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50">
                <p className="text-xs font-black text-blue-400 uppercase mb-1">Examples</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Salaries, Interest on loans, Subsidies.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-purple-50 dark:bg-purple-900/10 p-8 rounded-3xl border border-purple-100 dark:border-purple-800"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-600 rounded-2xl text-white"><Building2 size={24} /></div>
              <h4 className="text-xl font-black text-purple-900 dark:text-purple-200">Capital Account</h4>
            </div>
            <p className="text-purple-800 dark:text-purple-300 font-medium mb-6">Think of this as "Buying a House" or a big investment.</p>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50">
                <p className="text-xs font-black text-purple-400 uppercase mb-1">Examples</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Building Highways, New Trains, Machinery.</p>
              </div>
            </div>
          </motion.div>
          <div className="md:col-span-2 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">2026-27 Strategy: Spend more on Capital to build a better future.</p>
          </div>
        </div>
      )
    },
    {
      id: 'rupee-comes',
      title: "4. Where does the money come from?",
      subtitle: "Sources of Government Income",
      content: budgetData ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full"
        >
          <RupeePieChart data={budgetData.rupeeComesFrom} title="Every ₹1 comes from..." />
        </motion.div>
      ) : <div className="h-[400px] flex items-center justify-center">Loading Chart...</div>
    },
    {
      id: 'rupee-goes',
      title: "5. Where does the money go?",
      subtitle: "Government Spending Priorities",
      content: budgetData ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full"
        >
          <RupeePieChart data={budgetData.rupeeGoesTo} title="Every ₹1 is spent on..." />
        </motion.div>
      ) : <div className="h-[400px] flex items-center justify-center">Loading Chart...</div>
    },
    {
      id: 'highlights',
      title: "6. Big Wins for 2026-27",
      subtitle: "Where the major investments are going",
      content: (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400"><Sprout size={32} /></div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Agriculture</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{budgetData?.agriculture}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400"><GraduationCap size={32} /></div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Education</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{budgetData?.education}</p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm"
            >
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-2xl text-orange-600 dark:text-orange-400"><Building2 size={32} /></div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Infrastructure</p>
                <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{budgetData?.infrastructure}</p>
              </div>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AllocationBarChart data={budgetData} />
          </motion.div>
        </div>
      )
    },
    {
      id: 'tax',
      title: "7. Tax: What's in it for you?",
      subtitle: "Simplifying the New Tax Regime",
      content: (
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h4 className="text-3xl font-black mb-6">More Money in Your Pocket</h4>
              <p className="text-indigo-100 text-xl leading-relaxed font-medium">
                {budgetData?.taxSlabs}
              </p>
            </div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
          <div className="grid grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-center"
            >
              <p className="text-xs font-black text-slate-400 uppercase mb-2">Standard Deduction</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">₹75,000</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-center"
            >
              <p className="text-xs font-black text-slate-400 uppercase mb-2">Zero Tax Up To</p>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₹12 Lakhs</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-center"
            >
              <p className="text-xs font-black text-slate-400 uppercase mb-2">Process</p>
              <p className="text-2xl font-black text-slate-700 dark:text-slate-200">Paperless</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'vision',
      title: "8. The Big Goal: 2047",
      subtitle: "Viksit Bharat — A Developed India",
      content: (
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <h4 className="text-2xl font-black text-slate-800 dark:text-slate-200">The 4 Pillars of Growth</h4>
            <div className="grid grid-cols-2 gap-4">
              {['Poor', 'Youth', 'Farmers', 'Women'].map((item, idx) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 font-black text-slate-700 dark:text-slate-300 text-center"
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {budgetData?.viksitBharat}
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            className="relative"
          >
            <div className="aspect-square bg-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-300 dark:shadow-none">
              <Target className="w-40 h-40 text-white animate-pulse" />
            </div>
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-8 py-4 rounded-full shadow-xl border border-slate-200 dark:border-slate-700"
            >
              <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">$30 Trillion Economy</p>
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: "9. Wrap Up",
      subtitle: "A Plan for a Stronger Tomorrow",
      content: (
        <div className="space-y-12 text-center max-w-3xl mx-auto flex flex-col justify-center h-full">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
          >
            The 2026-27 Budget isn't just about numbers. It's a roadmap that uses **Economic Principles** to build a **Developed India**.
          </motion.p>
          <div className="grid grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 bg-emerald-50 dark:bg-emerald-900/10 rounded-3xl border border-emerald-100 dark:border-emerald-800"
            >
              <h5 className="font-black text-emerald-800 dark:text-emerald-300 mb-3 uppercase tracking-widest text-xs">The Vision</h5>
              <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">Growth with Stability</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-800"
            >
              <h5 className="font-black text-blue-800 dark:text-blue-300 mb-3 uppercase tracking-widest text-xs">The Driver</h5>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">Technology & People</p>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'references',
      title: "Sources & References",
      subtitle: "Where we got our data",
      content: (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-black text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-3 uppercase tracking-widest text-sm">
              <Info className="w-6 h-6 text-indigo-600" /> Official Academic Sources
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'India Budget Portal', url: 'indiabudget.gov.in', icon: <ExternalLink size={18} /> },
                { name: 'GSEB Economics Textbook', url: 'Chapter 10: Budget', icon: <BookOpen size={18} /> },
                { name: 'Ministry of Finance', url: 'pib.gov.in', icon: <ExternalLink size={18} /> }
              ].map((source, idx) => (
                <motion.li 
                  key={source.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer border border-transparent hover:border-indigo-100 dark:hover:border-indigo-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">{source.icon}</div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{source.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{source.url}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">
            Data updated as of Feb 2026.
          </p>
        </div>
      )
    },
    {
      id: 'credits',
      title: "Thank You!",
      subtitle: "Presentation Credits",
      content: (
        <div className="relative flex flex-col items-center justify-center h-full space-y-12 text-center overflow-hidden py-12">
          {/* Animated Background Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  scale: Math.random() * 2
                }}
                animate={{ 
                  y: [null, "-120%"],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 5 + 5, 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative w-40 h-40 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-300 dark:shadow-none"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <TrendingUp className="w-20 h-20 text-white" />
            </motion.div>
            
            {/* Orbiting Ring */}
            <motion.div 
              className="absolute inset-0 border-4 border-indigo-400/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
          </motion.div>
          
          <div className="space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white dark:border-slate-700 shadow-xl"
            >
              <p className="text-xs font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-[0.4em] mb-2">Developed By</p>
              <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Harsh Sharma</h4>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-3xl border border-white dark:border-slate-700 shadow-xl"
            >
              <p className="text-xs font-black text-emerald-500 dark:text-emerald-400 uppercase tracking-[0.4em] mb-2">Presented By</p>
              <h4 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Harsh Sharma & Sachin</h4>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <p className="text-slate-500 dark:text-slate-400 font-bold italic text-lg">
              "Empowering India through Economic Literacy"
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto rounded-full" />
          </motion.div>
        </div>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 font-medium">Fetching 2026-27 Budget Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/50 selection:text-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-slate-800 dark:text-slate-200">Budget 2026-27 Explorer</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Slide {currentSlide + 1} of {slides.length}
            </span>
            <div className="h-1.5 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600 dark:bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-5xl mx-auto min-h-[600px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-lg font-medium text-indigo-600/80 dark:text-indigo-400/80">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 min-h-[400px]">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-between items-center pointer-events-auto">
          <button
            onClick={prevSlide}
            className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all active:scale-95 disabled:opacity-50"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
            <span className="font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Previous</span>
          </button>

          <div className="hidden md:flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  currentSlide === idx ? "bg-indigo-600 dark:bg-indigo-500 w-8" : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                )}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="group flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all active:scale-95"
          >
            <span className="font-semibold">
              {currentSlide === slides.length - 1 ? "Restart" : "Next Slide"}
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
