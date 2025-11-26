import { AppSidebar } from "@/components/app-sidebar"
import AuthInitializer from "@/components/authInitializer";
import Container from "@/components/container"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function SistemaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <Container>
                        {children}
                    </Container>
                </SidebarInset>
                <AuthInitializer />
            </SidebarProvider>
        </div>
    );
}