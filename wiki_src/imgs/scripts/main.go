package main

import (
	"fmt"
	"image"
	"image/png"
	"io"
	"os"
	"path/filepath"
	"strings"
)

const (
	// この値以上なら白とみなす
	whiteThreshold = 245

	// コンテンツの下に残す余白
	bottomMargin = 40
)

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer in.Close()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, in)
	return err
}

func main() {
	if len(os.Args) != 3 {
		fmt.Printf("usage: %s <input-dir> <output-dir>\n", os.Args[0])
		os.Exit(1)
	}

	inputDir := os.Args[1]
	outputDir := os.Args[2]

	if err := os.MkdirAll(outputDir, 0755); err != nil {
		panic(err)
	}

	entries, err := os.ReadDir(inputDir)
	if err != nil {
		panic(err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}

		if strings.ToLower(filepath.Ext(entry.Name())) != ".png" {
			continue
		}

		inputPath := filepath.Join(inputDir, entry.Name())
		outputPath := filepath.Join(outputDir, entry.Name())

		if err := trimPNG(inputPath, outputPath); err != nil {
			fmt.Printf("ERROR %s: %v\n", entry.Name(), err)
			continue
		}

		fmt.Printf("OK %s\n", entry.Name())
	}
}

func trimPNG(inputPath, outputPath string) error {
	inFile, err := os.Open(inputPath)
	if err != nil {
		return err
	}
	defer inFile.Close()

	img, err := png.Decode(inFile)
	if err != nil {
		return err
	}

	bounds := img.Bounds()

	lastContentY := bounds.Min.Y - 1

	// 下から上へ走査
	for y := bounds.Max.Y - 1; y >= bounds.Min.Y; y-- {
		for x := bounds.Min.X; x < bounds.Max.X; x++ {
			r, g, b, _ := img.At(x, y).RGBA()

			if !isWhite(r, g, b) {
				lastContentY = y
				break
			}
		}

		if lastContentY == y {
			break
		}
	}

	// 全体が白だった場合
	if lastContentY < bounds.Min.Y {
		return fmt.Errorf("no content found")
	}

	newBottom := lastContentY + 1 + bottomMargin

	// 余白がない場合は単純コピー
	if newBottom >= bounds.Max.Y {
		return copyFile(inputPath, outputPath)
	}

	cropRect := image.Rect(
		bounds.Min.X,
		bounds.Min.Y,
		bounds.Max.X,
		newBottom,
	)

	cropped := img.(interface {
		SubImage(image.Rectangle) image.Image
	}).SubImage(cropRect)

	outFile, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer outFile.Close()

	return png.Encode(outFile, cropped)
}

func isWhite(r, g, b uint32) bool {
	threshold := uint32(whiteThreshold * 257)

	return r >= threshold &&
		g >= threshold &&
		b >= threshold
}
