{ pkgs }: {
	deps = [
		pkgs.nodePackages.prettier
    pkgs.yarn
		pkgs.nodejs-18_x
    pkgs.replitPackages.jest
    pkgs.nodePackages.typescript-language-server
	];
}