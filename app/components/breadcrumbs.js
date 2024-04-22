// breadcrumbs.js - This component displays the breadcrumbs for the current page
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
        { href: "/computers/desktops/parts/cpu", label: "CPUs" }
    ],
    computerDesktopPartsMem: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" },
        { href: "/computers/desktops/parts", label: "Parts" },
        { href: "/computers/desktops/parts/memory", label: "Memory" }
    ],
    computerDesktopPartsHdd: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/desktops", label: "Desktops" },
        { href: "/computers/desktops/parts", label: "Parts" },
        { href: "/computers/desktops/parts/hdd", label: "HDD" }
    ],
    computersLaptops: [
        { href: "/", label: "Home" },
        { href: "/computers", label: "Computers" },
        { href: "/computers/laptops", label: "Laptops" }
    ],
    gaming: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" }
    ],
    gamingConsoles: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/consoles", label: "Consoles" }
    ],
    gamingConsolesPlaystation: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/consoles", label: "Consoles" },
        { href: "/gaming/consoles/playstation", label: "Playstation" }
    ],
    gamingConsolesNintendo: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/consoles", label: "Consoles" },
        { href: "/gaming/consoles/nintendo", label: "Nintendo" }
    ],
    gamingConsolesXbox: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/consoles", label: "Consoles" },
        { href: "/gaming/consoles/xbox", label: "Xbox" }
    ],
    gamingAccessories: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/accessories", label: "Accessories" }
    ],
    gamingAccessoriesHeadsets: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/accessories", label: "Accessories" },
        { href: "/gaming/accessories/headsets", label: "Headsets" }
    ],
    gamingAccessoriesControllers: [
        { href: "/", label: "Home" },
        { href: "/gaming", label: "Gaming" },
        { href: "/gaming/accessories", label: "Accessories" },
        { href: "/gaming/accessories/controllers", label: "Controllers" }
    ],
    homeElectronics: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" }
    ],
    homeElectronicsTelevisions: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" },
        { href: "/home-electronics/televisions", label: "Televisions" }
    ],
    homeElectronicsSpeakers: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" },
        { href: "/home-electronics/speakers", label: "Speakers" }
    ],
    homeElectronicsHomeSecurity: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" },
        { href: "/home-electronics/home-security", label: "Home Security" }
    ],
    homeElectronicsMediaStreamers: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" },
        { href: "/home-electronics/media-streamers", label: "Media Streamers" }
    ],
    homeElectronicsAppliances: [
        { href: "/", label: "Home" },
        { href: "/home-electronics", label: "Home Electronics" },
        { href: "/home-electronics/appliances", label: "Appliances" }
    ],
    camerasDrones: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" }
    ],
    drones: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" },
        { href: "/cameras-drones/drones", label: "Drones" }
    ],
    camerasMemory: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" },
        { href: "/cameras-drones/memory", label: "Memory" }
    ],
    camerasAction: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" },
        { href: "/cameras-drones/action", label: "Action" }
    ],
    camerasDsl: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" },
        { href: "/cameras-drones/dsl", label: "DSLR" }
    ],
    camerasPointAndShoot: [
        { href: "/", label: "Home" },
        { href: "/cameras-drones", label: "Cameras & Drones" },
        { href: "/cameras-drones/point-and-shoot", label: "Point & Shoot" }
    ],
}

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
