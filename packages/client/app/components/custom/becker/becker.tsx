import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";

export function Becker() {
  return (
    <div className="pt-4">
      <Button onClick={() => window.history.back()} variant="ghost">
        <ArrowLeft className="inline-block" /> Back
      </Button>
    </div>
  );
}
