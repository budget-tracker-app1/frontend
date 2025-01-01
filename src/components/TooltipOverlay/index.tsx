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
      const element = document.querySelector(target) as HTMLElement | null;
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
          borderRadius="md"
          top={`${targetElement.offsetTop}px`}
          left={`${targetElement.offsetLeft}px`}
          width={`${targetElement.offsetWidth}px`}
          height={`${targetElement.offsetHeight}px`}
          border="2px solid rgba(255, 215, 0, 0.8)"
          cursor="pointer"
        />
      )}

      {/* Tooltip */}
      {targetElement && (
        <Box
          position="absolute"
          zIndex="1200"
          bg="#fff8dc"
          color="black"
          p={4}
          borderRadius="md"
          shadow="lg"
          top={`${tooltipPosition.top}px`}
          left={`${tooltipPosition.left}px`}
          transform="translateX(-50%)"
          border="1px solid #f0e68c"
          fontSize="lg"
          fontWeight="medium"
          textAlign="center"
          maxW="300px"
        >
          {steps[currentStep].message}

          {/* Buttons */}
          <HStack spacing={4} mt={4} justify="center">
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              flex="1"
              onClick={onSkip}
            >
              Skip
            </Button>
            <Button
              size="sm"
              colorScheme="teal"
              flex="1"
              onClick={onNext}
            >
              Next {currentStep + 1}/{steps.length}
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

export default TooltipOverlay;