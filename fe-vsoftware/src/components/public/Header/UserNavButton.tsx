"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { isCustomerAuthenticated } from "@/lib/customer-auth"
import { customerGetMe } from "@/lib/api/customer"

const UserNavButton = () => {
    const [displayName, setDisplayName] = useState<string | null>(null)

    useEffect(() => {
        if (!isCustomerAuthenticated()) return
        customerGetMe()
            .then((res) => setDisplayName(res.data.fullName))
            .catch(() => {})
    }, [])

    if (displayName) {
        return (
            <Link
                href="/tai-khoan"
                className="inline-flex items-center px-3 py-3 text-[15px] font-bold text-vs-dark hover:text-vs-blue transition-colors whitespace-nowrap"
            >
                {displayName.split(" ").slice(-1)[0]}
            </Link>
        )
    }

    return (
        <Link
            href="/dang-nhap"
            className="inline-flex items-center px-3 py-3 text-[15px] font-bold text-vs-dark hover:text-vs-blue transition-colors whitespace-nowrap"
        >
            Đăng nhập
        </Link>
    )
}

export default UserNavButton
