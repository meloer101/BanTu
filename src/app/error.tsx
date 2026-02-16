"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center space-y-4">
          <h1 className="text-xl font-semibold">出错了</h1>
          <p className="text-sm text-muted-foreground">
            页面遇到问题，请刷新重试或稍后再访问。
          </p>
          <Button onClick={reset}>重试</Button>
        </CardContent>
      </Card>
    </div>
  );
}
