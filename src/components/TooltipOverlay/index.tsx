import { Box, Button, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Step {
  target: string;
  message: string;
}

interface TooltipOverlayProps {
  currentStep: number;
  steps: Step[];
  onNext: () => void;
  onSkip: () => void;
}

const TooltipOverlay: React.FC<TooltipOverlayProps> = ({
  currentStep,
  steps,
  onNext,
  onSkip,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (currentStep < steps.length) {
      const { target } = steps[currentStep];
      const element = document.querySelector('#' + target) as HTMLElement | null;
      if (element) {
        setTargetElement(element);

        if (targetElement) {
          targetElement.style.zIndex = "";
        }

        element.style.zIndex = "1100";

        // Calculate tooltip position
        const rect = element.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top + window.scrollY + rect.height + 10, // Position tooltip below the element
          left: rect.left + window.scrollX + rect.width / 2, // Center horizontally
        });
      }
    } else {
      setTargetElement(null);
    }
  }, [currentStep, steps, targetElement]);

  return (
    <>
      {/* Dark overlay */}
      {targetElement && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.7)"
          zIndex="1000"
        />
      )}

      {/* Highlight the target element */}
      {targetElement && (
        <Box
          position="absolute"
          zIndex="1100"
          bg="transparent"
          borderRadius={getComputedStyle(targetElement).borderRadius}
          border="2px solid rgba(255, 215, 0, 0.8)"
          cursor="pointer"
          top={`${
            targetElement.getBoundingClientRect().top +
            window.scrollY
          }px`}
          left={`${
            targetElement.getBoundingClientRect().left +
            window.scrollX
          }px`}
          width={`${targetElement.getBoundingClientRect().width}px`}
          height={`${targetElement.getBoundingClientRect().height}px`}
        />
      )}

      {/* Tooltip */}
      {targetElement && (
        <Box
          position="absolute"
          zIndex="1200"
          bg="#fff8dc"
          color="black"
          p="0.9vw"
          borderRadius="0.3vw"
          shadow="lg"
          top={`${tooltipPosition.top}px`}
          left={`${tooltipPosition.left}px`}
          transform="translateX(-50%)"
          border="1px solid #f0e68c"
          fontSize="0.94vw"
          fontWeight="medium"
          textAlign="center"
          maxW="15.63vw"
        >
          {steps[currentStep].message}

          {/* Buttons */}
          <HStack spacing="1vw" mt="0.8vw" justify="center">
            {currentStep !== steps.length - 1 &&
              <Button
                h="1.68vw"
                colorScheme="red"
                variant="outline"
                flex="1"
                fontSize="0.73vw"
                borderRadius="0.3vw"
                onClick={onSkip}
              >
                Skip
              </Button>
            }
            <Button
              h="1.68vw"
              colorScheme="teal"
              flex="1"
              fontSize="0.73vw"
              borderRadius="0.3vw"
              onClick={onNext}
            >
              {currentStep === steps.length - 1 ? "Understood" : `${"Next " + (currentStep + 1) + "/" + steps.length}`}
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default TooltipOverlay;