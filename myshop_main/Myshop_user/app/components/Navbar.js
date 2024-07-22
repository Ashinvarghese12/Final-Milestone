
'use client';
import Link from 'next/link';
import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ToggleTheme from './ToggleTheme';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../redux/slices/cartSlice';


export default function MainHeaderPage() {

    const path = usePathname();
    const totalItems = useSelector(selectTotalItems);

    const StyledBadge = styled(Badge)({
    });

    return (
        <nav className='border-t-4 border-t-violet-700 border-b sticky top-0 z-10 shadow'>
            <div className=" flex justify-between ps-40 py-3 bg-white">
                <span></span>
                <ul className="flex text-base gap-3 text-black font-bold">
                    <li className=' px-2 pt-3 text-sm '><Link href='/' >Home</Link></li>
                    <li className=' px-2 pt-3 text-sm  '><Link href='/shop' className={path.startsWith('/shop') ? 'underline' : undefined}>Store</Link></li>
                    <li className='px-2 text-sm '>
                        <Link href='/cart' className={path.startsWith('/cart') ? 'underline' : undefined} >
                            <div className="flex ">
                                <span className='pt-3'>Cart</span>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={totalItems} color="secondary">
                                        <ShoppingCartIcon />
                                    </StyledBadge>
                                </IconButton>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className='flex gap-4'>
                    <button className="btn btn-primary text-black" >
                        Sign Out
                    </button>
                    <span className='pt-2 pe-2 '></span>
                </div>
            </div>
        </nav>
    );

}
















    // <button className="bg-violet-500 px-2 py-1 rounded text-white text-sm">
    //     Sign In
    // </button> 