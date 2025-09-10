import React, { useEffect, useMemo, useRef } from "react";
import { isMobileOnly } from "react-device-detect";

import { useClickSound } from '@shared/react-hooks';
import { useModalStack, modalStackManager } from '@shared/utils/modal-stack-manager';
import { ModalType } from "./type";
import { cn } from '@shared/utils/merge-tailwind-util';

const HeaderHeightInPixel = 55;

export type Props = {
    isOpen?: boolean;
    onCloseModal?: Function | null;
    children?: React.ReactNode;
    type?: ModalType;
    betContainerPosition?: number;
    enableBackdrop?: boolean;
    toggleBtnRef?: React.MutableRefObject<HTMLElement>;
    isBlockUI?: boolean;
    isOverlap?: boolean;
    extendedClassName?: string;
    isBlockScroll?: boolean;
};

const getCustomStyle = ({ betContainerPosition }: { betContainerPosition?: number }) => {
    const style = { scale: "var(--scale-factor, 1)", transformOrigin: "top" };
    const browserHeight = window.innerHeight;

    if (betContainerPosition != null) {
        return browserHeight / betContainerPosition > 2
            ? { top: `${betContainerPosition}px`, ...style }
            : { bottom: `${browserHeight - betContainerPosition + HeaderHeightInPixel}px`, top: "auto", ...style };
    }

    return style;
};

const BaseDialog: React.FC<Props> = ({
    children,
    onCloseModal = null,
    isOpen = true,
    type = ModalType.Full,
    betContainerPosition,
    enableBackdrop,
    toggleBtnRef,
    isBlockUI,
    isOverlap = false,
    extendedClassName = "",
    isBlockScroll = true,
}: Props) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const clickSound = useClickSound();
    const isIpad = useMemo(() => /iPad/i.test(navigator.userAgent), []);
    const { addModal } = useModalStack();

    useEffect(() => {
        if (isOpen) {
            addModal(onCloseModal);
        }
    }, [isOpen, addModal, onCloseModal]);

    useEffect(() => {
        if (!isBlockScroll) {
            return undefined;
        }
        const className = "overflow-hidden";
        if (enableBackdrop) {
            document.getElementById("dashboard")?.classList.add(className);
            document.body.classList.add(className);
            isMobileOnly && document.documentElement.classList.add(className);
        }

        return () => {
            document.body.classList.remove(className);
            if (enableBackdrop && !isOverlap) {
                document.getElementById("dashboard")?.classList.remove(className);
                isMobileOnly && document.documentElement.classList.remove(className);
            }
        };
    }, [enableBackdrop, isOverlap, isBlockScroll]);

    const handleClickOutside = (event: any) => {
        clickSound();
        modalStackManager.closeTopModal();
    };

    useEffect(() => {
        const handleClickOutsideEvent = (event: any) => {
            if (isOpen && !wrapperRef?.current?.contains(event.target) && !toggleBtnRef?.current?.contains(event.target)) {
                handleClickOutside(event);
            }
        };
        !isBlockUI && document.addEventListener("mousedown", handleClickOutsideEvent);
        return () => {
            !isBlockUI && document.removeEventListener("mousedown", handleClickOutsideEvent);
        };
    }, [wrapperRef, isOpen, clickSound, isBlockUI, toggleBtnRef]);

    return (
        <>
            {enableBackdrop && (
                <div className={cn("fixed inset-0 top-[-8px] z-[300] bg-black/40", type === ModalType.Rebet && "md:hidden")} />
            )}

            <div
                style={getCustomStyle({ betContainerPosition })}
                ref={wrapperRef}
                className={cn(
                    "absolute cursor-auto p-4 text-popup-text z-[301] rounded-t-xl md:rounded-b-xl",
                    type === ModalType.Full && "fixed inset-x-0 top-4 bottom-0 pl-0 pr-0 z-[300] bg-popup-gradient",
                    type === ModalType.Rebet && "fixed bg-popup-gradient md:absolute md:right-[50%] md:bottom-0",
                    type === ModalType.Center && "bg-transparent border-none shadow-none p-0 rounded-none fixed inset-0 top-0",
                    type === ModalType.Message && "rounded-md p-0 left-1 right-1 shadow-none",
                    type === ModalType.Toast && "h-full",
                    isIpad && "pb-[69px]",
                    isOpen ? "block animate-showBottom" : "hidden animate-hideBottom",
                    extendedClassName
                )}
            >
                <div className="h-full flex flex-col">{children}</div>
            </div>
        </>
    );
};

export default BaseDialog;
