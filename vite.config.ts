import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
	  allowedHosts: [
      'deokheebyeola-invitation.run.goorm.io',
      // 다른 허용할 호스트를 추가할 수 있습니다.
    ],
    host: '0.0.0.0',  // 네트워크에서 접근할 수 있도록 0.0.0.0 설정
    port: 3000,      // 포트 11700 사용
  },
  base: '',  // 빌드된 파일의 기본 경로 설정
});
