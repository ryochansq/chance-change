import { useEffect, useMemo, useState } from "react";
import { Button, Center, HStack, Image, SimpleGrid } from "@chakra-ui/react";
import { CheckCircleIcon, MinusIcon } from "@chakra-ui/icons";
import { useCountDown } from "../hooks/useCountDown";

const r = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
const rows = (count: number) => count * 3;
const nums = (count: number) => count * rows(count);

type Props = {
  setScene: React.Dispatch<React.SetStateAction<Scene>>;
};

export const Game = ({ setScene }: Props) => {
  const [count, setCount] = useState(1);
  const [rand, setRand] = useState(r(0, nums(count)));
  const [one, setOne] = useState("chance");
  const [other, setOther] = useState("change");
  const moons = useMemo(
    () =>
      new Array<string>(nums(count))
        .fill("")
        .map((_, i) => (i === rand ? other : one)),
    [count, rand, other, one]
  );

  const { countTime } = useCountDown(3);
  const countText = countTime === 0 ? "START!!" : countTime;

  useEffect(() => {
    setRand(r(0, nums(count)));
    if (Math.random() < 0.5) {
      setOne(other);
      setOther(one);
    }
  }, [count]);

  const onClick = async (i: number) => {
    if (i !== rand) return;
    await new Promise((resolve) => setTimeout(resolve, 280));
    if (count < 5) setCount(count + 1);
    else setScene("result");
  };

  if (countTime >= 0) {
    return (
      <Center fontSize="32px" fontWeight="bold" mt="80px">
        {countText}
      </Center>
    );
  }

  return (
    <>
      <HStack justify="center" mb="1" fontSize="24px">
        {new Array(5)
          .fill(0)
          .map((_, i) =>
            i + 1 < count ? (
              <CheckCircleIcon color="green.400" key={i} />
            ) : (
              <MinusIcon key={i} />
            )
          )}
      </HStack>
      <SimpleGrid maxH="100%" columns={count} spacing="0.5">
        {moons.map((v, i) => (
          <Button
            key={i}
            h={`calc((100vh - 300px) / ${rows(count)})`}
            maxW="200px"
            maxH="80px"
            onClick={() => onClick(i)}
            p="0"
            colorScheme="whiteAlpha"
            _active={{
              backgroundColor: i === rand ? "green.200" : "red.400",
            }}
          >
            <Image src={`${v}.png`} w="100%" h="100%" objectFit="contain" />
          </Button>
        ))}
      </SimpleGrid>
    </>
  );
};
