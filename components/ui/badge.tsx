import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-800 text-slate-100 shadow hover:bg-slate-700",
        success:
          "border-transparent bg-gradient-to-r from-[#0052D4] to-[#0041a8] text-white shadow hover:from-[#0041a8] hover:to-[#003380]",
        warning:
          "border-transparent bg-amber-600 text-white shadow hover:bg-amber-700",
        destructive:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        outline: "text-slate-100 border-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
