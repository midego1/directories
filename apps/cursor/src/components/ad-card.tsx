"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Ad } from "@/data/ads";
import { useOpenPanel } from "@openpanel/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export function AdCard({ ad }: { ad: Ad }) {
  const op = useOpenPanel();

  useEffect(() => {
    op.track("ad_grid_viewed", {
      ad_id: ad.id,
      ad_url: ad.link,
      type: "ad_card",
    });
  }, [ad]);

  return (
    <Card className="bg-background p-4 max-h-[calc(100vh-8rem)] aspect-square flex flex-col">
      <CardContent className="bg-card h-full mb-2 p-0 font-mono text-sm group relative flex-grow">
        <a
          href={ad.link}
          onClick={() => {
            op.track("ad_card_clicked", {
              ad_id: ad.id,
              ad_url: ad.link,
              type: "ad_card",
            });
          }}
          target="_blank"
          rel="noopener noreferrer"
          className="h-full"
        >
          <div className="h-full relative">
            <Image
              src={ad.imageUrl}
              alt={`${ad.title} preview`}
              fill
              className="object-cover"
              quality={100}
            />
          </div>
        </a>
      </CardContent>

      <CardHeader className="p-0 space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm truncate">{ad.title}</CardTitle>
          <div className="relative w-6 h-6">
            <Image
              quality={100}
              src={ad.logoUrl}
              alt={`${ad.title} logo`}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#878787] font-mono">{ad.description}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
