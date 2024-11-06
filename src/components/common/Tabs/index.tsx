"use client";

import Button from "@/components/common/Button";
import {
  tabContentListVariants,
  tabContentVariants,
  tabTriggerListVariants,
  tabTriggerVariants,
  tabsVariants,
} from "@/components/common/Tabs/Tabs.variant";
import { cn } from "@/utils/core";
import { VariantProps } from "class-variance-authority";
import React from "react";

type TabContextValue = VariantProps<typeof tabsVariants> & {
  activeTab: string;
  handleTabClick: (value: string) => void;
};

const TabContext = React.createContext<TabContextValue | undefined>(undefined);

/**
 * @property {string} defaultValue: 기본으로 선택되는 탭 메뉴
 */
type TabsProps = VariantProps<typeof tabsVariants> & {
  defaultValue: string;
  children: React.ReactNode;
};

/**
 * @property {VariantProps<typeof tabsVariants>} variant: tabsVariants의 variants에서 정의된 속성값
 */
const Tabs = ({ defaultValue, children, variant }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  return (
    <TabContext.Provider value={{ activeTab, variant, handleTabClick }}>
      <div className={tabsVariants({ variant })}>{children}</div>
    </TabContext.Provider>
  );
};

type TabTriggerListProps = {
  children: React.ReactNode;
};

/**
 * @description 탭 메뉴들 묶음
 */
const TabTriggerList = ({ children }: TabTriggerListProps) => {
  const context = React.useContext(TabContext);
  if (!context)
    throw new Error(
      "TabContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant } = context;

  return <div className={tabTriggerListVariants({ variant })}>{children}</div>;
};

type TabContentListProps = {
  children: React.ReactNode;
};

/**
 * @description 탭 메뉴 컨텐츠들 묶음
 */
const TabContentList = ({ children }: TabContentListProps) => {
  const context = React.useContext(TabContext);
  if (!context)
    throw new Error(
      "TabContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { variant } = context;

  return <div className={tabContentListVariants({ variant })}>{children}</div>;
};

type TabTriggerProps = {
  value: string;
  children: React.ReactNode;
};

/**
 * @description 탭 메뉴 버튼 하나
 */
const TabTrigger = ({ value, children }: TabTriggerProps) => {
  const context = React.useContext(TabContext);
  if (!context)
    throw new Error(
      "TabContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { activeTab, variant, handleTabClick } = context;

  return (
    <Button
      onClick={() => handleTabClick(value)}
      className={cn(
        tabTriggerVariants({ isActive: activeTab === value, variant }),
      )}
    >
      {children}
    </Button>
  );
};

type TabContentProps = {
  value: string;
  children: React.ReactNode;
};

/**
 * @description 탭 메뉴 하나당의 내용
 */
const TabContent = ({ value, children }: TabContentProps) => {
  const context = React.useContext(TabContext);
  if (!context)
    throw new Error(
      "TabContext is undefined. Ensure that Tabs component is used as a parent component.",
    );
  const { activeTab, variant } = context;

  return value === activeTab ? (
    <div className={tabContentVariants({ variant })}>{children}</div>
  ) : null;
};

export { Tabs, TabTriggerList, TabContentList, TabContent, TabTrigger };
