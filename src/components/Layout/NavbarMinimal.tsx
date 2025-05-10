import {useEffect, useState} from "react";
import {rem, Button, useMantineTheme} from "@mantine/core";
import {IconUserCircle,IconLogout,IconHome,IconMovie,IconKey,IconCopyCheck,IconKeyFilled,IconHexagonPlus,IconHexagonPlusFilled,IconSettings,IconList, IconHexagonLetterM
} from "@tabler/icons-react";
import classes from "./NavbarMinimalColored.module.css";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mantine/hooks";
import useAuth from "../../hooks/useAuth.tsx";
import {AuthContext} from "../../context/AuthContext.tsx";


interface NavbarLinkProps {
    icon: typeof IconHome;
    label: string;
    color: string;
    active?: boolean;

    onClick?(): void;
}

function NavbarLink({icon: Icon, label, color, active, onClick}: NavbarLinkProps) {

    return (
        <div
            role="button"
            className={classes.link} color={color}
            onClick={onClick}
            data-active={active || undefined}
        >
            <Button variant="light" color={color} className={classes.iconButton} style={{width: rem(40), height: rem(40), flexGrow: 0, flexShrink:0, flexBasis: rem(40)}}>
                <Icon className={classes.linkIcon} style={{width: rem(25), height: rem(25), flexGrow: 0, flexShrink:0, flexBasis: rem(25)}} stroke={1.8}/>
            </Button>
            <span>{label}</span>
        </div>
    );
}

export function NavbarMinimal({toggle}: any) {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const {logout} = useAuth();  

    const menuItems = [
        {
            icon:IconMovie,
            label: "Filmek",
            url: "movies",
            roles: ['Admin', 'RegisteredUser', 'Cashier']
        },
        // {
        //     icon:IconMovie,
        //     label: "Vetítések",
        //     url: "screenings"
        // },
        {
            icon:IconHexagonPlusFilled,
            label: "Film hozzáadása",
            url: "addmovie",
            roles: ['Admin', 'Cashier']
        },
        {
            icon:IconHexagonPlus,
            label: "Vetítés hozzáadása",
            url: "addscreening",
            roles: ['Admin', 'Cashier']
        },
        {
            icon:IconKeyFilled,
            label: "Film Módosítása",
            url: "modifymovie",
            roles: ['Admin', 'Cashier']
        },
        {
            icon:IconKey,
            label: "Vetítés Módosítása",
            url: "alterscreening",
            roles: ['Admin', 'Cashier']
        },
        {
            icon:IconCopyCheck,
            label: "Jegy Validálás",
            url: "validateticket",
            roles: ['Admin', 'Cashier']
        }
    ];


    const onLogout = () => {
        logout();
    }

    useEffect(() => {
        setActive(menuItems.findIndex(m => location.pathname === m.url));
    }, [])

    const links = menuItems
        .map((link, index) => (
            <NavbarLink
                color="app-color"
                {...link}
                key={link.label}
                active={index === active}
                onClick={async () => {
                    setActive(index);
                    toggle();
                    navigate(link.url);
                }}
            />
        ));

    return (
        <nav className={classes.navbar}>
            <div>
                <div className={classes.navbarMain}>
                    {links}
                </div>
                <div className={classes.footer} style={{width: !isMobile ? '216px' : '90%'}}>
                    <NavbarLink
                        active={location.pathname === '/profile'}
                        icon={IconUserCircle}
                        label="Profil"
                        onClick={() => {
                            navigate("profile");
                            toggle();
                        }} color="grape" />
                    <NavbarLink
                        icon={IconLogout}
                        label={"Kijelentkezés"}
                        onClick={onLogout} color="grape"/>

                </div>
            </div>
        </nav>
    );
}
