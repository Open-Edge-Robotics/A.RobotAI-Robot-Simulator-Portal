"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Typography } from "@mui/material";
import { MENU_ITEMS } from "@/constants/_navbar";

type NavItemProps = {
  href: string;
  itemId: string;
  label: string;
  children?: React.ReactNode;
  isLink?: boolean;
  isSubItem?: boolean;
  isSelected?: boolean;
};

const NavItem = ({
  href,
  itemId,
  label,
  children,
  isLink,
  isSubItem = false,
  isSelected = false,
}: NavItemProps) => {
  const content = (
    <TreeItem
      itemId={itemId}
      label={label}
      classes={{
        content: isSubItem
          ? "gap-4 hover:text-white hover:bg-none bg-black-950 px-3 py-3 rounded-none"
          : "hover:bg-green-400 hover:text-white px-3 py-3 rounded-none border-b border-gray-900",
        focused: `text-white`,
        selected: `${isSubItem ? "bg-black-950 !important" : "bg-transparent !important"}`,
      }}
      sx={{
        "& .Mui-selected": {
          color: isSelected ? "white !important" : "inherit",
        },
        ...(isSubItem && {
          "&.MuiCollapse-root": {
            padding: "0px 2px",
          },
        }),
      }}
    >
      {children}
    </TreeItem>
  );

  if (!isLink) return content;
  return <Link href={href}>{content}</Link>;
};

const Navbar = () => {
  const pathname = usePathname();

  const defaultTab = MENU_ITEMS[0].href;
  const selectedTab =
    MENU_ITEMS.find(
      (menu) => pathname.startsWith(menu.href) || pathname === menu.href,
    )?.href ?? defaultTab;

  return (
    <nav className="stickytop-0 flex h-screen w-60 min-w-60 flex-col bg-black-900 text-gray-200">
      <Typography
        variant="h6"
        className="w-full border-b border-gray-900 py-6 text-center text-lg font-bold text-green-400"
      >
        자율행동체 플랫폼
      </Typography>
      <Box>
        <SimpleTreeView
          sx={{
            "& .MuiCollapse-root": {
              padding: "0px",
            },
          }}
        >
          {MENU_ITEMS.map((item, i) => (
            <NavItem
              key={`${item.id}-${i}`}
              itemId={`${item.id}-${i}`}
              href={item.href}
              label={item.label}
              isLink={item.children.length > 0 ? false : true}
              isSelected={
                pathname === item.href || pathname.startsWith(item.href)
              }
            >
              {item.children?.map((child, i) => (
                <NavItem
                  key={`${child.id}-${i}`}
                  itemId={`${item.id}-${i}`}
                  href={child.href}
                  label={child.label}
                  isLink
                  isSubItem={true}
                  isSelected={
                    pathname === item.href || pathname.startsWith(item.href)
                  }
                />
              ))}
            </NavItem>
          ))}
        </SimpleTreeView>
      </Box>
    </nav>
  );
};

export default Navbar;
