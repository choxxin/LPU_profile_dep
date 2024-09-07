import React from "react";

export function Card({ children }) {
  return <div className="bg-white shadow rounded p-4">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b pb-2 mb-2">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={`${className} mt-4 pt-2 border-t`}>{children}</div>;
}
