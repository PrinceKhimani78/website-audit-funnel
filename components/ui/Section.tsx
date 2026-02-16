import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, children, id, ...props }, ref) => {
        return (
            <section
                ref={ref}
                id={id}
                className={cn("py-20 md:py-32 px-4 md:px-8 max-w-7xl mx-auto relative", className)}
                {...props}
            >
                {children}
            </section>
        );
    }
);
Section.displayName = "Section";

export { Section };
