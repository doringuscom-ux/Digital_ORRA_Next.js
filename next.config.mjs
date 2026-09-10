/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "digitalorra.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // 301 Permanent Redirect from /services/:slug to /:slug
        // Negative lookahead (?!) ensures /services itself is NOT redirected
        source: '/services/:slug((?!$).+)',
        destination: '/:slug',
        permanent: true,
      },
      // 301 Redirects for Old WordPress Service Slugs
      {
        source: '/seo',
        destination: '/seo-search-engine-optimization',
        permanent: true,
      },
      {
        source: '/website-development',
        destination: '/web-app-development',
        permanent: true,
      },
      {
        source: '/pay-per-click',
        destination: '/google-ads-ppc',
        permanent: true,
      },
      {
        source: '/video-editing',
        destination: '/video-editing-motion-graphics',
        permanent: true,
      },
      {
        source: '/social-media-optimisation',
        destination: '/social-media-handling',
        permanent: true,
      },
      {
        source: '/graphic-designing-2',
        destination: '/graphic-designing',
        permanent: true,
      },
      {
        source: '/360-virtual-tour-services-in-india',
        destination: '/360-virtual-tour',
        permanent: true,
      },
      // Old Contact Us to new Contact
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      // Old WordPress /core-mambers & /core-members to /our-team
      {
        source: '/core-mambers',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/core-members',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/core-mambers/:path*',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/core-members/:path*',
        destination: '/our-team',
        permanent: true,
      },
      // Old WordPress /it-company to /company-profile
      {
        source: '/it-company',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/it-company/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      // Old WordPress /academy to /courses
      {
        source: '/academy',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/academy/:path*',
        destination: '/courses',
        permanent: true,
      },
      // Plural /testimonials to /testimonial
      {
        source: '/testimonials',
        destination: '/testimonial',
        permanent: true,
      },
      {
        source: '/testimonials/:path*',
        destination: '/testimonial',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
