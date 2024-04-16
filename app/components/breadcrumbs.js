// TODO: breadcrumbs.js - This component displays the breadcrumbs for the current page

'use client'

// The breadcrumbsData object contains the data for the breadcrumbs based on the current page
const breadcrumbsData = {
    computers: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" }
    ],
    computersDesktops: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" }
    ],
    computersDesktopsParts: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" },
        { href: "/computers/desktops/parts", label: "Parts" }
    ],
    computersDesktopsPartsCpus: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" },
        { href: "/computers/desktops/parts", label: "Parts" },
        { href: "/computers/desktops/parts/cpus", label: "CPUs" }
    ],
    computerDesktopPartsMem: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" },
        { href: "/computers/desktops/parts", label: "Parts" },
        { href: "/computers/desktops/parts/ram", label: "MEM" }
    ],
};


export default function Breadcrumbs({ category }) {

    // Get the breadcrumbs for the current category
    const categoryBreadcrumbs = breadcrumbsData[category];

    // Render the breadcrumbs by mapping over the categoryBreadcrumbs array and displaying the links
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="flex list-none p-0"> {/* Container classes */}
                    {categoryBreadcrumbs.map(({ href, label }, index) => (
                        <li key={index} className="mr-1"> {/* Spacing */}
                            <a href={href}>{label}</a>
                            {index < categoryBreadcrumbs.length - 1 && (
                                <span className="text-gray-500"> {'>'} </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
