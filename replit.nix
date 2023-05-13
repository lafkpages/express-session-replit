{ pkgs }: {
	deps = [
    pkgs.yarn
    pkgs.esbuild
		pkgs.nodejs-18_x
    pkgs.replitPackages.jest
    pkgs.nodePackages.prettier
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
	];
}