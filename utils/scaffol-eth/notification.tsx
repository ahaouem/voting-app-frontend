import { CheckCircleIcon, Info, ShieldAlert, TriangleAlert, X } from "lucide-react";
import React from "react";
import { ToastPosition, toast } from "react-hot-toast";

// todo: change it for shadcn ui component
type NotificationProps = {
    content: React.ReactNode;
    status: "success" | "info" | "loading" | "error" | "warning";
    duration?: number;
    icon?: string;
    position?: ToastPosition;
};

type NotificationOptions = {
    duration?: number;
    icon?: string;
    position?: ToastPosition;
};

const ENUM_STATUSES = {
    success: <CheckCircleIcon className="w-7 text-success" />,
    loading: <span className="w-6 loading loading-spinner"></span>,
    error: <ShieldAlert className="w-7 text-error" />,
    info: <Info className="w-7 text-info" />,
    warning: <TriangleAlert className="w-7 text-warning" />,
};

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION: ToastPosition = "top-center";

/**
 * Custom Notification
 */
const Notification = ({
    content,
    status,
    duration = DEFAULT_DURATION,
    icon,
    position = DEFAULT_POSITION,
}: NotificationProps) => {
    return toast.custom(
        (t: any) => (
            <div
                className={`flex flex-row items-start justify-between max-w-sm rounded-xl shadow-center shadow-accent bg-base-200 p-4 transform-gpu relative transition-all duration-500 ease-in-out space-x-2
        ${
            position.substring(0, 3) == "top"
                ? `hover:translate-y-1 ${t.visible ? "top-0" : "-top-96"}`
                : `hover:-translate-y-1 ${t.visible ? "bottom-0" : "-bottom-96"}`
        }`}
            >
                <div className="leading-[0] self-center">{icon ? icon : ENUM_STATUSES[status]}</div>
                <div className={`overflow-x-hidden break-words whitespace-pre-line ${icon ? "mt-1" : ""}`}>
                    {content}
                </div>

                <div className={`cursor-pointer text-lg ${icon ? "mt-1" : ""}`} onClick={() => toast.dismiss(t.id)}>
                    <X className="w-6 cursor-pointer" onClick={() => toast.remove(t.id)} />
                </div>
            </div>
        ),
        {
            duration: status === "loading" ? Infinity : duration,
            position,
        },
    );
};

export const notification = {
    success: (content: React.ReactNode, options?: NotificationOptions) => {
        return Notification({ content, status: "success", ...options });
    },
    info: (content: React.ReactNode, options?: NotificationOptions) => {
        return Notification({ content, status: "info", ...options });
    },
    warning: (content: React.ReactNode, options?: NotificationOptions) => {
        return Notification({ content, status: "warning", ...options });
    },
    error: (content: React.ReactNode, options?: NotificationOptions) => {
        return Notification({ content, status: "error", ...options });
    },
    loading: (content: React.ReactNode, options?: NotificationOptions) => {
        return Notification({ content, status: "loading", ...options });
    },
    remove: (toastId: string) => {
        toast.remove(toastId);
    },
};