import {
  Container,
  Flex,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <Flex direction={"column"} p={3} className="bg-off-white">
      <Container maxW={{ base: "3xl", xl: "8xl" }}>
        <Text
          color={"#2C514C"}
          fontSize={{ base: "18px", xl: "30px" }}
          className="font-semibold"
        >
          Customise
        </Text>
        <Text color={"#2C514C"} fontSize={{ base: "12px", xl: "18px" }}>
          Customise your dress to impress with our fashion pieces that
          effortlessly blend style and comfort
        </Text>

        <Breadcrumb
          className="mt-3"
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Text color={"#2C514C"} fontSize={{ base: "12px", xl: "18px" }}>
                Home
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <Text color={"#2C514C"} fontSize={{ base: "12px", xl: "18px" }}>
                Products
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">
              <Text
                className="font-semibold"
                color={"#2C514C"}
                fontSize={{ base: "12px", xl: "18px" }}
              >
                Customize
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
    </Flex>
  );
};
export default Header;
