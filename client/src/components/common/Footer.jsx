import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const sections = [
    {
      title: "Shop",
      links: ["All Products", "Categories", "New Arrivals", "Best Sellers"],
    },
    {
      title: "Customer Service",
      links: ["Contact Us", "Shipping Policy", "Return Policy", "FAQ"],
    },
    {
      title: "Account",
      links: ["My Account", "My Orders", "Wishlist", "Login"],
    },
  ];

  const socials = [FaXTwitter, FaFacebookF, FaLinkedinIn];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tight">Nova Cart</h2>

            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Shop smarter with Nova Cart. Discover premium products with a fast
              and seamless online shopping experience.
            </p>

            <div className="flex gap-3">
              {socials.map((Icon, index) => (
                <Link
                  key={index}
                  to="#"
                  className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border bg-background
                  text-muted-foreground
                  transition-all
                  hover:-translate-y-1
                  hover:text-foreground
                  hover:shadow-md
                  "
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-5 font-semibold">{section.title}</h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="
                      group flex items-center gap-2
                      text-sm text-muted-foreground
                      transition
                      hover:text-foreground
                      "
                    >
                      <span>{link}</span>

                      <ArrowRight
                        size={14}
                        className="
                        opacity-0
                        -translate-x-2
                        transition
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}

        <div
          className="
          mt-14 flex flex-col gap-4
          rounded-2xl border
          bg-background
          p-6
          md:flex-row
          md:items-center
          md:justify-between
          "
        >
          <div>
            <h3 className="font-semibold">Stay updated</h3>

            <p className="text-sm text-muted-foreground">
              Get updates about new products and offers.
            </p>
          </div>

          <div className="flex w-full max-w-md">
            <input
              placeholder="Enter your email"
              className="
              h-11 flex-1 rounded-l-lg
              border bg-background px-4
              text-sm outline-none
              "
            />

            <button
              className="
              rounded-r-lg
              bg-primary px-5
              text-primary-foreground
              "
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
          mt-10 flex flex-col gap-4
          border-t pt-6
          text-sm text-muted-foreground
          md:flex-row md:justify-between
          "
        >
          <p>© {new Date().getFullYear()} Nova Cart. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="#">Privacy Policy</Link>

            <Link to="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
