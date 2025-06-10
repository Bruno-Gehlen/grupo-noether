class Point {

    // Setup environment
    constructor(X, Y, Z, color) {
        this.X = X;
        this.Y = Y;
        this.Z = Z;

        // Initialize colors
        this.R = color[0];
        this.G = color[1];
        this.B = color[2];

        // Create array
        this.points = [createVector(X, Y, Z)];
    } 
    
    getLastVector() {
        return this.points[this.points.length - 1];
    }

    // Calcule DX, DY and DZ
    calcule() {
        let DX = sigma  * (this.Y - this.X);
        let DY = this.X * (rho    - this.Z) - this.Y;
        let DZ = this.X * this.Y  - beta    * this.Z

        // Apply changes
        this.X += DX * DT;
        this.Y += DY * DT;
        this.Z += DZ * DT;

        // Add vector to array
        let vector = createVector(
            this.X,
            this.Y,
            this.Z
        );

        this.points.push(vector);
        
        // Adjust array
        if (this.points.length > 500) {
            this.points.shift();
        }
    }

    // Draw point on canvas
    show() {
        noFill();

        beginShape();
        for (let point of this.points) {
            stroke(
                this.R, 
                this.G,
                this.B,
                10);

            vertex(
                point.x,
                point.y,
                point.z,
            );
        }
        endShape();
    }
}
