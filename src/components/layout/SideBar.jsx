import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames';

function SideBar() {
    const { pathname } = useLocation()
    const sideLinks = [
        {
            label: "Dashboard",
            path: "/dashboard"
        },
        {
            label: "Category",
            path: "/category"
        }, {
            label: "Product",
            path: "/product"
        }, {
            label: "Payment Options",
            path: "/payment-option"
        }, {
            label: "Order",
            path: "/order"
        }, {
            label: "Client",
            path: "/client"
        },
        {
            label: "hr"
        },
        {
            label: "RegisterAdmin",
            path: "/register"
        },
        {
            label: "Profile",
            path: "/profile"
        },
    ]


    return (<>
        <div>
            <nav>
                <div className='mt-3 text-center'>Welcome Admin</div>
                <hr />
            </nav>
        </div>
        <div>
            <ul className='list-unstyled side-links'>
                {sideLinks.map(({ path, label }) => {
                    if (label === 'hr') {
                        return <hr key={label}></hr>
                    }


                    const liClass = classNames({
                        "mt-2": true,
                        "p-2": true,
                        "ms-2": true,
                        'active': pathname.includes(path),
                    });

                    return <li key={label} className={liClass}><Link className='nav-link' to={path}>{label}</Link></li>
                })}
            </ul>
        </div>
    </>
    )
}

export default SideBar