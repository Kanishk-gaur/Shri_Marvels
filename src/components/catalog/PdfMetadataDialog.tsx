// src/components/catalog/PdfMetadataDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PdfMetadataDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  metadata: { name: string; title: string; description: string };
  setMetadata: (data: any) => void;
  onConfirm: () => void;
}

export function PdfMetadataDialog({ isOpen, onOpenChange, metadata, setMetadata, onConfirm }: PdfMetadataDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Catalog Details</DialogTitle>
          <DialogDescription>Enter details for the PDF front page.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input 
            placeholder="Client Name" 
            value={metadata.name} 
            onChange={(e) => setMetadata((p: any) => ({ ...p, name: e.target.value }))} 
          />
          <Input 
            placeholder="Catalog Title" 
            value={metadata.title} 
            onChange={(e) => setMetadata((p: any) => ({ ...p, title: e.target.value }))} 
          />
          <Textarea 
            placeholder="Notes / Description" 
            value={metadata.description} 
            onChange={(e) => setMetadata((p: any) => ({ ...p, description: e.target.value }))} 
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-zinc-800 text-white">Confirm & Generate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}