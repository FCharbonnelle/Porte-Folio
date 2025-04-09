'use client';

import React from 'react';
import InfiniteHorizontalScroll from '@/components/InfiniteHorizontalScroll';
import { projectsData } from '@/data/projectsData';

export default function ProjetsPage() {
  return (
    <main className="min-h-screen">
      <InfiniteHorizontalScroll projects={projectsData} />
    </main>
  );
} 