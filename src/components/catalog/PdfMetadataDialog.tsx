// src/components/catalog/PdfMetadataDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PdfMetadata {
  name: string;
  title: string;
  description: string;
}

interface PdfMetadataDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  metadata: PdfMetadata;
  setMetadata: (data: PdfMetadata | ((prev: PdfMetadata) => PdfMetadata)) => void;
  onConfirm: () => void;
}

export function PdfMetadataDialog({ isOpen, onOpenChange, metadata, setMetadata, onConfirm }: PdfMetadataDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white opacity-100">
        <DialogHeader>
          <DialogTitle>Catalog Details</DialogTitle>
          <DialogDescription>Enter details for the PDF front page.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input 
            placeholder="Client Name" 
            value={metadata.name} 
            onChange={(e) => setMetadata((prev) => ({ ...prev, name: e.target.value }))} 
          />
          <Input 
            placeholder="Catalog Title" 
            value={metadata.title} 
            onChange={(e) => setMetadata((prev) => ({ ...prev, title: e.target.value }))} 
          />
          <Textarea 
            placeholder="Notes / Description" 
            value={metadata.description} 
            onChange={(e) => setMetadata((prev) => ({ ...prev, description: e.target.value }))} 
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