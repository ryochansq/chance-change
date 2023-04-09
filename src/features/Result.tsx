import { Button, Center, Collapse, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useReward } from "react-rewards";
import { Footer } from "../components/Footer";

type Props = {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
  time: number;
};

export const Result = ({ setScene, time }: Props) => {
  const [fade, setFade] = useState([false, false, false]);
  const { reward } = useReward("rewardId", "confetti");

  useEffect(() => {
    const id1 = setTimeout(() => setFade([true, false, false]), 300);
    const id2 = setTimeout(() => setFade([true, true, false]), 700);
    const id3 = setTimeout(() => setFade([true, true, true]), 1100);
    const confetti = setTimeout(reward, 1200);
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
      clearTimeout(id3);
      clearTimeout(confetti);
    };
  }, []);

  const timeString = (time / 1000 - 4).toFixed(2);

  const onClickReplay = () => setScene("game");

  const onClickTweet = () => {
    const text = `Chance×Change で\nクリアタイム ${timeString}秒 でした！\n\nryochansq.github.io/chance-change/\n\n#さくら学院父兄パソコン部\n#ChanceChange #onefive`;
    const encodedText = encodeURIComponent(text);
    const intent = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(intent);
  };

  return (
    <>
      <Collapse in={fade[0]} animateOpacity>
        <Center mt="64px" fontSize="20px">
          クリアタイム
        </Center>
      </Collapse>
      <Collapse in={fade[1]} animateOpacity>
        <Flex justify="center" align="baseline">
          <Text as="b" fontSize="28px">
            {timeString}
          </Text>
          <Text fontSize="20px" ml="8px">
            秒
          </Text>
        </Flex>
      </Collapse>
      <Collapse in={fade[2]} animateOpacity>
        <Flex justify="center" gap="16px" mt="16px">
          <Button bg="#4CD4CB" size="md" onClick={onClickReplay}>
            <Text as="b">もういちど遊ぶ！</Text>
          </Button>
          <Button colorScheme="twitter" size="md" onClick={onClickTweet}>
            <Text as="b">Twitterで共有</Text>
          </Button>
        </Flex>
        <Footer />
      </Collapse>
      <Center id="rewardId" />
    </>
  );
};
