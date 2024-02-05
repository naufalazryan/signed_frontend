import styled from 'styled-components';

const MarqueeContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  position: relative;
`;

const MarqueeText = styled.p`
  display: inline-block;
  padding-right: 10px;
  animation: marquee-animation 10s linear infinite;
`;

const Marquee = () => {
  return (
    <MarqueeContainer>
      <MarqueeText className="text-black font-semibold">
        Jangan lupa mencuci tangan menggunakan sabun | 
      </MarqueeText>
    </MarqueeContainer>
  );
};

export default Marquee;
