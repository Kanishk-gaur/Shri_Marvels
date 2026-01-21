// src/components/catalog/PdfMetadataDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react"; //

// Updated Interface
interface PdfMetadata {
  name: string;
  mobile: string; // Changed from title to mobile
  description: string;
}

interface PdfMetadataDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  metadata: PdfMetadata;
  setMetadata: (
    data: PdfMetadata | ((prev: PdfMetadata) => PdfMetadata),
  ) => void;
  onConfirm: () => void;
  isGenerating?: boolean; // New prop for loading state
}

export function PdfMetadataDialog({
  isOpen,
  onOpenChange,
  metadata,
  setMetadata,
  onConfirm,
  isGenerating = false,
}: PdfMetadataDialogProps) {
  // Validation: Check word count for description
  const wordCount = metadata.description
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  // Compulsory field validation
  const isInvalid =
    !metadata.name.trim() ||
    !metadata.mobile.trim() || // Validate mobile instead of title
    metadata.mobile.length < 10 || // Optional: Add basic length check
    wordCount < 1;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white opacity-100">
        <DialogHeader>
          <DialogTitle>Catalog Details</DialogTitle>
          <DialogDescription>
            All fields are compulsory. Description requires at least 3 words.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Client Name (Compulsory)"
            value={metadata.name}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, name: e.target.value }))
            }
            disabled={isGenerating}
            className={!metadata.name.trim() ? "border-orange-200" : ""}
          />
          <Input
            placeholder="Mobile Number (Compulsory)"
            type="tel"
            value={metadata.mobile}
            onChange={(e) =>
              setMetadata((prev) => ({ ...prev, mobile: e.target.value }))
            }
            disabled={isGenerating}
            className={!metadata.mobile.trim() ? "border-orange-200" : ""}
          />
          <div className="space-y-1">
            <Textarea
              placeholder="Notes / Description (Min. 3 words)"
              value={metadata.description}
              onChange={(e) =>
                setMetadata((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={isGenerating}
              className={wordCount < 3 ? "border-orange-200" : ""}
            />
            <p
              className={`text-[10px] ${wordCount < 3 ? "text-orange-500" : "text-zinc-400"}`}
            >
              Word count: {wordCount} / 3
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isInvalid || isGenerating}
            className="bg-zinc-800 text-white min-w-[140px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Confirm & Generate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
