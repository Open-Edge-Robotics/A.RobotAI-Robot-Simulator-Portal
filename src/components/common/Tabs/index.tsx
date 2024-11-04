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

  const tabTriggerList = React.Children.toArray(children)[0];
  const tabContentList = React.Children.toArray(children)[1];

  const modifiedTabTriggers = React.isValidElement(tabTriggerList)
    ? React.cloneElement(
        tabTriggerList as React.ReactElement<TabTriggerListProps>,
        {
          activeTab,
          onClickInput: handleTabClick,
          variant,
        },
      )
    : null;

  const modifiedTabContents = React.isValidElement(tabContentList)
    ? React.cloneElement(
        tabContentList as React.ReactElement<TabContentListProps>,
        {
          activeTab,
          variant,
        },
      )
    : null;

  return (
    <div className={tabsVariants({ variant })}>
      {modifiedTabTriggers}
      {modifiedTabContents}
    </div>
  );
};

type TabTriggerListProps = VariantProps<typeof tabsVariants> & {
  children: React.ReactNode;
  activeTab?: string;
  onClickInput?: (value: string) => void;
};

/**
 * @description 탭 메뉴들 묶음
 */
const TabTriggerList = ({
  children,
  activeTab,
  variant,
  onClickInput,
}: TabTriggerListProps) => {
  return (
    <div className={tabTriggerListVariants({ variant })}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.value) {
          return React.cloneElement(
            child as React.ReactElement<TabTriggerProps>,
            {
              isActive: child.props.value === activeTab,
              variant,
              onClickInput: () => onClickInput?.(child.props.value),
            },
          );
        }
        return child;
      })}
    </div>
  );
};

type TabContentListProps = VariantProps<typeof tabsVariants> & {
  children: React.ReactNode;
  activeTab?: string;
};

/**
 * @description 탭 메뉴 컨텐츠들 묶음
 */
const TabContentList = ({
  children,
  activeTab,
  variant,
}: TabContentListProps) => {
  return (
    <div className={tabContentListVariants({ variant })}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.value) {
          return React.cloneElement(
            child as React.ReactElement<TabContentProps>,
            {
              isActive: child.props.value === activeTab,
              variant,
            },
          );
        }
        return child;
      })}
    </div>
  );
};

type TabTriggerProps = VariantProps<typeof tabTriggerVariants> &
  VariantProps<typeof tabsVariants> & {
    value: string;
    children: React.ReactNode;
    isActive?: boolean;
    onClickInput?: () => void;
  };

/**
 * @description 탭 메뉴 버튼 하나
 */
const TabTrigger = ({
  children,
  isActive,
  variant,
  onClickInput,
}: TabTriggerProps) => {
  return (
    <Button
      onClick={onClickInput}
      className={cn(tabTriggerVariants({ isActive, variant }))}
    >
      {children}
    </Button>
  );
};

type TabContentProps = VariantProps<typeof tabsVariants> & {
  value: string;
  children: React.ReactNode;
  isActive?: boolean;
};

/**
 * @description 탭 메뉴 하나당의 내용
 */
const TabContent = ({ isActive, children, variant }: TabContentProps) => {
  return isActive ? (
    <div className={tabContentVariants({ variant })}>{children}</div>
  ) : null;
};

export { Tabs, TabTriggerList, TabContentList, TabContent, TabTrigger };
