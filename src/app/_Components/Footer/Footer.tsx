"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/Assets/screens/freshcart-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="w-full md:w-4/5 mx-auto py-12 px-5 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image src={logo} alt="FreshCart Logo" width={120} height={40} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products at unbeatable prices. 
              Shop with confidence and enjoy fast delivery.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-slate-900 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <i className="fab fa-x-twitter text-sm"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-sm"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube text-sm"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-slate-900 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="TikTok"
              >
                <i className="fab fa-tiktok text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/allorders" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/addresses" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Addresses
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-white transition-colors duration-300 text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="fas fa-map-marker-alt text-green-400 mt-1"></i>
                <p className="text-slate-300 text-sm">
                  123 Shopping Street<br />
                  Cairo, Egypt 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-green-400"></i>
                <p className="text-slate-300 text-sm">+20 123 456 7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-green-400"></i>
                <p className="text-slate-300 text-sm">info@freshcart.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © 2025 FreshCart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
