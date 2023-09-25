import { Card, Image, Skeleton } from "@nextui-org/react";

const CardSkeleton = () => {
  return (
    <Card isPressable isFooterBlurred radius="lg" className="border-none group">
      <Skeleton>
        <Image className="object-cover" height={300} width={300} />
      </Skeleton>
    </Card>
  );
};

export default CardSkeleton;
