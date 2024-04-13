import React from "react"

export default function signUPlayout({ children }: {
    children: React.ReactNode
}) {
    return <div>
        <div className="border p-3 text-center">
            20% off || Expires tomorrow
        </div>
        {children}
    </div>
}