// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 시 네비게이션 배경 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
    }
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// 모든 섹션에 fade-in 클래스 추가 및 관찰
document.querySelectorAll('section > div').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// 폼 제출 처리 - Discord 웹훅
const contactForm = document.querySelector('.contact-form');
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1372111792796467250/xO81-DH5D2IVlxyhmsMLgqsK6w-hJE0Gm-DbODnR5UYBWHarUYW9jAL8UGC0iyYVq-6Z';

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        // 폼 데이터 가져오기
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        // 버튼 비활성화 및 로딩 상태
        submitButton.disabled = true;
        submitButton.textContent = '전송 중...';
        
        try {
            // Discord 웹훅으로 메시지 전송
            const embed = {
                title: '📧 새로운 포트폴리오 문의',
                color: 5814783, // 보라색 (#8b5cf6)
                fields: [
                    {
                        name: '👤 이름',
                        value: name,
                        inline: true
                    },
                    {
                        name: '📧 이메일',
                        value: email,
                        inline: true
                    },
                    {
                        name: '💬 메시지',
                        value: message.length > 1000 ? message.substring(0, 1000) + '...' : message,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: '포트폴리오 웹사이트'
                }
            };
            
            const payload = {
                embeds: [embed]
            };
            
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            if (response.ok) {
                alert('메시지가 성공적으로 전송되었습니다!');
                contactForm.reset();
            } else {
                throw new Error('전송 실패');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('메시지 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            // 버튼 상태 복원
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// 타이핑 효과 (선택사항)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    // 히어로 섹션 요소들에 애니메이션 추가
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-in';
            heroTitle.style.opacity = '1';
        }, 200);
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 1s ease-in';
            heroSubtitle.style.opacity = '1';
        }, 600);
    }
});

// 스킬 카드 호버 효과 강화
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 프로젝트 카드 호버 효과
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

