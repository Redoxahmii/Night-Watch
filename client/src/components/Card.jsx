/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import {
  Card as CardNext,
  CardFooter,
  Image,
  Button,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
} from "@nextui-org/react";
import YouTube from "react-youtube";
import { Play, Star } from "lucide-react";
const Card = ({ Data }) => {
  const {
    title,
    navigateLink,
    posterPath,
    overview,
    vote_average,
    trailerUrl,
  } = Data;
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <CardNext
        isPressable
        onPress={onOpen}
        isFooterBlurred
        radius="lg"
        className="border-none group"
      >
        <Image
          src={posterPath}
          alt={title}
          className="object-cover"
          height={300}
          width={300}
        />
        <CardFooter
          as="div"
          className="justify-between bg-black/50 group-hover:block hidden transition-transform animate-fade animate-duration-500 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
        >
          <p className="text-md font-semibold">{title}</p>
          <p className="text-sm text-white/80 mt-2">
            {overview.substring(0, 150)}...
          </p>
        </CardFooter>
        <Modal
          isOpen={isOpen}
          size="5xl"
          placement="center"
          classNames={{
            base: "bg-black/70",
          }}
          backdrop="blur"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                <ModalBody as="div">
                  <div className="flex justify-center gap-10 items-center">
                    <div className=" flex flex-col gap-2">
                      <h1 className="font-bold text-2xl">{title}</h1>
                      <p className="text-white/70 text-sm">{overview}</p>
                      <div className="flex items-center gap-2">
                        <Star
                          size={20}
                          fill="currentColor"
                          className="text-yellow-400"
                        ></Star>
                        <p className="text-white/70 text-sm">{vote_average}</p>
                      </div>
                    </div>
                    <div className="lg:flex hidden rounded-xl">
                      <YouTube
                        videoId={trailerUrl}
                        iframeClassName=" rounded-xl"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    variant="shadow"
                    startContent={<Play size={15}></Play>}
                    onPress={() => navigate(navigateLink)}
                  >
                    Watch
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardNext>
    </>
  );
};

export default Card;
