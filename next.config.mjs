/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  // CORS 에러 방지 위해 리버스 프록시 적용
  rewrites: async () => {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
        },
      ],
    };
  },
  // 리다이렉트 설정 추가
  // 현재 메인페이지 구현 안 되있으므로 인스턴스 페이지로 리다이렉트
  redirects: async () => {
    return [
      {
        source: "/main",
        destination: "/instance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
