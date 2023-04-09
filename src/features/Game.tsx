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

type Parameter = {
  count: number;
  rand: number;
  one: "chance" | "change";
  other: "chance" | "change";
};

export const Game = ({ setScene }: Props) => {
  const [param, setParam] = useState<Parameter>({
    count: 1,
    rand: r(0, nums(1)),
    one: "chance",
    other: "change",
  });
  const { count, rand, one, other } = param;
  const moons = useMemo(
    () =>
      new Array<string>(nums(count))
        .fill("")
        .map((_, i) => (i === rand ? other : one)),
    [count, rand, other, one]
  );

  const { countTime } = useCountDown(3);
  const countText = countTime === 0 ? "START!!" : countTime;

  const onClick = async (i: number) => {
    if (i !== rand) return;
    await new Promise((resolve) => setTimeout(resolve, 280));
    if (count < 5) {
      const b = Math.random() < 0.5;
      setParam({
        count: count + 1,
        rand: r(0, nums(count + 1)),
        one: b ? other : one,
        other: b ? one : other,
      });
    } else setScene("result");
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
