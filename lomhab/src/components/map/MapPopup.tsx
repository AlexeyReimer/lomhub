import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Yard } from "@/lib/mock-yards";

type MapPopupProps = {
  yard: Yard;
};

export function MapPopup({ yard }: MapPopupProps) {
  return (
    <Card className="w-[260px] rounded-2xl border-slate-200 p-4 shadow-lg">
      <CardHeader className="mb-4 gap-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-6">{yard.name}</CardTitle>
          <StatusBadge variant={yard.status === "Открыто" ? "success" : "neutral"}>
            {yard.status}
          </StatusBadge>
        </div>
      </CardHeader>
      <CardContent className="gap-3">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Город</span>
            <span className="font-medium text-slate-900">{yard.city}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Минимальная цена</span>
            <span className="font-semibold text-emerald-700">{yard.minPrice}</span>
          </div>
        </div>
        <Button size="sm" className="mt-1 w-full">
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
}
