import Image from "next/image";
import React from "react";
import HomePic from '@/public/image/HomePic.jpeg'

export default function HomePage(){
    return (
        <div>
          <div className="card pb-7">
            <main>
              <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                    Welcome to Our Store
                  </h2>
                  <p className="mt-2 text-3xl text-black leading-8 font-extrabold tracking-tight sm:text-4xl">
                    Discover the Best Products Online
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Find amazing products at unbeatable prices. Shop now and enjoy a
                    seamless online shopping experience.
                  </p>
                </div>
                <div className="mt-10">
                  <Image
                    className="mx-auto h-96 w-1/2 object-cover rounded-lg shadow-md"
                    src={HomePic}
                    alt="Shopping"
                  />
                </div>
              </div>
            </main>
            <footer className="sticky bottom-0 pt-20">
              <div className="container mx-auto py-2 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-400">
                  &copy; 2024 Online Shop. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </div>
      );
}